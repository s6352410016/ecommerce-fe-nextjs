import { hasCookie } from "@/actions/cookies";
import { AuthVerify } from "@/components/ui/auth-verify";

export default async function AuthVerifyPage() {
  if(!(await hasCookie())){
    return null;
  }

  return (
    <AuthVerify />
  );
}
