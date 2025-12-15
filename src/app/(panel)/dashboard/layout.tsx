import { SidebarDashboard } from './_components/sidebar';

export default function DashbordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarDashboard>{children}</SidebarDashboard>
    </>
  );
}
