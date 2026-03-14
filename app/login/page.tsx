import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { login } from "./actions"

export default async function LoginPage(props: { searchParams: Promise<{ message: string }> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8 p-8 bg-card rounded-2xl border shadow-xl ring-8 ring-primary/5">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Admin Login</h1>
          <p className="text-muted-foreground">Access your portfolio dashboard</p>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-foreground/80">
              Email Address
            </label>
            <Input id="email" name="email" type="email" placeholder="name@example.com" required className="h-11 shadow-sm" />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-semibold text-foreground/80">
              Password
            </label>
            <Input id="password" name="password" type="password" required className="h-11 shadow-sm" />
          </div>
          <Button formAction={login} className="w-full h-11 text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
            Sign In
          </Button>
          {searchParams?.message && (
            <div className="mt-4 p-4 bg-destructive/10 text-destructive text-center text-sm font-medium rounded-lg border border-destructive/20 animate-in fade-in zoom-in duration-300">
              {searchParams.message}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
