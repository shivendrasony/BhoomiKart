"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import type { Session, User as SupabaseUser } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface User {
  id: string
  email: string
  name?: string
  userType: "buyer" | "seller" | "agent"
  emailConfirmed: boolean
  user_metadata?: {
    avatar_url?: string
    full_name?: string
    phone?: string
    address?: string
    city?: string
    state?: string
    [key: string]: any
  }
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, userType: string) => Promise<{ error?: Error; data?: { user: User } }>
  signIn: (email: string, password: string) => Promise<{ error?: Error; data?: { user: User } }>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Set up Supabase auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata?.full_name,
          userType: profile?.user_type || "buyer",
          emailConfirmed: session.user.email_confirmed_at != null,
          user_metadata: session.user.user_metadata
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    // Cleanup subscription
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signUp = async (email: string, password: string, userType: string) => {
    try {
      console.log("Starting signup process for:", email)
      
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            user_type: userType
          }
        }
      })

      if (authError) {
        console.error("Auth signup error:", authError)
        throw authError
      }

      console.log("Auth signup successful:", authData.user?.id)

      if (authData.user) {
        try {
          console.log("Attempting to create profile for user:", authData.user.id)
          
          // Create profile in profiles table
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: authData.user.id,
              email: email,
              user_type: userType,
              created_at: new Date().toISOString()
            })

          if (profileError) {
            console.error("Profile creation error:", profileError)
            toast({
              title: "Profile Creation Status",
              description: "Account created but profile setup needs attention. Please contact support if issues persist.",
              variant: "destructive"
            })
          } else {
            console.log("Profile created successfully")
            toast({
              title: "Registration Successful",
              description: "Account and profile created. Please check your email to confirm your account."
            })
          }
        } catch (profileError) {
          console.error("Profile creation exception:", profileError)
          toast({
            title: "Profile Creation Status",
            description: "Account created but profile setup encountered an error. Please contact support.",
            variant: "destructive"
          })
        }

        const user: User = {
          id: authData.user.id,
          email: email,
          userType: userType as "buyer" | "seller" | "agent",
          emailConfirmed: false,
          user_metadata: {
            user_type: userType
          }
        }

        console.log("Registration process completed for:", email)
        return { data: { user } }
      }

      throw new Error("Failed to create user")
    } catch (error) {
      console.error("Signup process error:", error)
      return { error: error as Error }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign in:", email)

      const { data: { user: authUser }, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (authError) {
        console.error("Auth error during sign in:", authError)
        
        // Handle email not confirmed case
        if (authError.message.includes("Email not confirmed")) {
          // Resend confirmation email
          const { error: resendError } = await supabase.auth.resend({
            type: 'signup',
            email: email,
            options: {
              emailRedirectTo: `${window.location.origin}/auth/callback`
            }
          })

          if (resendError) {
            console.error("Error resending confirmation email:", resendError)
            toast({
              title: "Login failed",
              description: "Please verify your email before logging in. Error resending verification email.",
              variant: "destructive"
            })
          } else {
            toast({
              title: "Email verification required",
              description: "We've sent a new verification email. Please check your inbox and verify your email before logging in.",
            })
          }
          throw new Error("Email not confirmed")
        }
        
        throw authError
      }

      if (authUser) {
        console.log("Auth successful, fetching profile...")
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single()

        if (profileError) {
          console.error("Error fetching profile:", profileError)
          toast({
            title: "Profile fetch failed",
            description: "Successfully authenticated but couldn't fetch your profile. Please try again.",
            variant: "destructive"
          })
          throw profileError
        }

        const user: User = {
          id: authUser.id,
          email: authUser.email!,
          name: authUser.user_metadata?.full_name,
          userType: profile?.user_type || "buyer",
          emailConfirmed: authUser.email_confirmed_at != null,
          user_metadata: authUser.user_metadata
        }

        console.log("Sign in successful for:", email)
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in."
        })

        return { data: { user } }
      }

      throw new Error("Failed to sign in")
    } catch (error: any) {
      console.error("Sign in process error:", error)
      
      // Provide user-friendly error messages
      let errorMessage = "An unexpected error occurred. Please try again."
      if (error.message?.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password. Please check your credentials."
      } else if (error.message?.includes("Email not confirmed")) {
        errorMessage = "Please verify your email before logging in. Check your inbox for the verification link."
      }

      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive"
      })

      return { error: error as Error }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/login")
  }

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) throw error
    } catch (error) {
      console.error("Google sign-in failed:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signOut,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
