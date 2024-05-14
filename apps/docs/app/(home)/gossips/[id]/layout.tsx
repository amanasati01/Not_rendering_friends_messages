
import { SideBar } from "@repo/ui/sidebar";
import MessageInput from "../../../../component/messageInput";

export default function DashboardLayout({
    children,
    params
  }: {
    children: React.ReactNode,
    params :{
      id : number
    }
  }) {
    // const router = useRouter();
    // const param = useSearchParams()
    
    
    return (
      <div>
        {/* <SideBar /> */}
        <div className="h-full mb-16">{children}</div>
        <div className="w-full bottom-0 fixed mt-4">
          <div className="w-full flex">
            <div className="w-full h-full">
              <MessageInput id={String(params.id)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
