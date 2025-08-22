import LoginForm from "@/_components/login-form";
import RegisterForm from "@/_components/register-form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/_components/ui/tabs";

const LoginPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center p-2">      
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="w-full flex gap-2 bg-transparent">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginPage;
