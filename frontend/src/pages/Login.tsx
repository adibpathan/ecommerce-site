import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex justify-center align-middle pt-8 pb-8">
      <div className="login w-96 p-10 shadow-2xl rounded font-semibold text-sm tracking-wide">
        <div className="heading">
          <h1 className="capitalize text-3xl">sign in</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 pt-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="demo@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between space-x-2 ">
                
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                 <Checkbox id="terms"/>Remember me
                </label>
              <Dialog>
      <DialogTrigger asChild className="bg-transparent border-none outline-none">
        <Button variant="outline" className="border-none outline-none cursor-pointer p-0 underline hover:bg-transparent focus:ring-0 border-b border-slate-800">Forgot your password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="capitalize font-semibold text-xl tracking-tight font-sans">reset password</DialogTitle>
          <DialogDescription className="pt-1">
          Enter your account's email address, and we'll send you a link to reset your password.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="">
            <Input
              id=""
              // defaultValue="Email Address"
              placeholder="Email Address"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="pt-3">
          <Button type="submit" className="bg-slate-800">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
              </div>
             
              <Button className="w-full bg-slate-800" type="submit">
                Submit
              </Button>
            </form>
          </Form>
          <p className="pt-5 pb-5 text-center font-semibold text-sm tracking-wide">
            Don't have an account?{" "}
            <Link className="capitalize underline text-gray-600 font-bold">
              sign up
            </Link>
          </p>
          <div className="divider pb-5">
            <div className="flex items-center justify-center">
              <div className="border-t border-gray-300 w-full"></div>
              <span className="px-2 text-gray-500">or</span>
              <div className="border-t border-gray-300 w-full"></div>
            </div>
          </div>
          {/* sign in with another option  */}
          <Button className="w-full bg-slate-800" type="submit">
          <FcGoogle className="pr-3 text-4xl"/>Sign in with Google
              </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
