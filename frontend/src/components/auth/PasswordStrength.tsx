interface Props {
  password: string;
}

export default function PasswordStrength({ password }: Props) {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
  ];

  const labels = [
    "Weak",
    "Fair",
    "Good",
    "Strong",
  ];

  return (
    <div className="mt-2">

      <div className="h-2 rounded-full bg-slate-200">

        <div
          className={`h-2 rounded-full ${
            strength === 0
              ? "w-0"
              : strength === 1
              ? "w-1/4"
              : strength === 2
              ? "w-2/4"
              : strength === 3
              ? "w-3/4"
              : "w-full"
          } ${colors[Math.max(strength - 1, 0)]}`}
        />

      </div>

      <p className="mt-2 text-xs text-slate-500">
        {password.length === 0 ? "" : labels[Math.max(strength - 1, 0)]}
      </p>

    </div>
  );
}