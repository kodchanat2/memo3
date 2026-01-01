import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/"); // Redirect to home on success
    } catch (err: any) {
      console.error("Login failed", err);
      setError(err.message || "Failed to sign in");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <Icon icon="line-md:cloud-alt-twotone" className="size-12 text-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Welcome
          </CardTitle>
          <CardDescription>
            Sign in to access your memo workspace
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
          >
            <Icon icon="logos:google-icon" className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
