import Image from "next/image";

export default function User() {
  return (
    <div className="flex items-center gap-4">
      <Image
        className="h-8 w-8 rounded-full"
        src="https://avatar.iran.liara.run/public/1"
        height={32}
        width={32}
        alt="avatar"
      />
    </div>
  );
}
