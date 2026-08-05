import fetch from "@/services/api";

export interface SendCodeChangePasswordRequest {
  email: string;
}

export interface VerifyTokenPasswordRecoveryRequest {
  email: string;
  code: string;
}

export interface ChangePasswordRequest {
  recoveryToken: string;
  newPassword: string;
}

export async function sendCodeChangePassword(
  data: SendCodeChangePasswordRequest,
): Promise<void> {
  await fetch.post("/account/send/code/change-password", data);
}

export async function verifyPasswordRecoveryCode(
  data: VerifyTokenPasswordRecoveryRequest,
): Promise<string> {
  const response = await fetch.post<string>(
    "/account/password-recovery/verify",
    data,
  );
  return response.data;
}

export async function changePassword(
  data: ChangePasswordRequest,
): Promise<void> {
  await fetch.patch("/account/change-password", data);
}
