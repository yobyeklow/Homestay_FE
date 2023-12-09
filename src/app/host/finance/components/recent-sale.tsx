import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";

export function RecentSales(guests: any) {
  return (
    <div className="space-y-8">
      {guests?.guests?.map((guest: any) => {
        return (
          <div key={guest._id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{guest?.name}</p>
              <p className="text-sm text-muted-foreground">{guest?.email}</p>
            </div>
            <div className="ml-auto font-medium">{guest?.phoneNumber}</div>
          </div>
        );
      })}
    </div>
  );
}
