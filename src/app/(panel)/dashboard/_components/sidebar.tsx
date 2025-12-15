'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import clsx from 'clsx';
import {
  Banknote,
  CalendarCheck2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FolderCog2Icon,
  ListIcon,
  Settings2Icon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import logoImg from '../../../../../public/logo-odonto.png';

export function SidebarDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  console.log(pathname);

  return (
    <div className='flex min-h-screen w-full'>
      <aside
        className={clsx(
          'flex flex-col border-r bg-background transition-all duration-300 p-4 h-full',
          {
            'w-20': isCollapsed,
            'w-64': !isCollapsed,
            'hidden md:flex md:fixed': true,
          }
        )}
      >
        <div className='mb-6 mt-4'>
          {!isCollapsed && (
            <Image
              src={logoImg}
              alt='Logo OdontoPRO'
              priority
              quality={100}
              style={{
                width: 'auto',
                height: 'auto',
              }}
            />
          )}
        </div>
        <Button
          className='bg-gray-100 hover:bg-green-50 text-zinc-900 self-end mb-2'
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRightIcon className='w-12 h-12' />
          ) : (
            <ChevronLeftIcon className='w-12 h-12' />
          )}
        </Button>

        <Collapsible open={!isCollapsed}>
          <span className='text-sm text-gray-400 font-medium mt-1 uppercase'>
            Painel
          </span>
          <SideBarLink
            href='/dashboard'
            label='Agendamentos'
            pathname={pathname}
            iscollapsed={isCollapsed}
            icon={<CalendarCheck2Icon />}
          />

          <SideBarLink
            href='/dashboard/services'
            label='Serviços'
            pathname={pathname}
            iscollapsed={isCollapsed}
            icon={<FolderCog2Icon />}
          />
          <span className='text-sm text-gray-400 font-medium mt-1 uppercase'>
            Minha Conta
          </span>
          <SideBarLink
            href='/dashboard/profile'
            label='Meu Perfil'
            pathname={pathname}
            iscollapsed={isCollapsed}
            icon={<Settings2Icon />}
          />

          <SideBarLink
            href='/dashboard/plans'
            label='Planos'
            pathname={pathname}
            iscollapsed={isCollapsed}
            icon={<Banknote />}
          />
        </Collapsible>
      </aside>

      <div
        className={clsx('flex flex-1 flex-col transition-all duration-300', {
          'md:ml-20': isCollapsed,
          'md:ml-64': !isCollapsed,
        })}
      >
        <header className='md:hidden flex items-center justify-between border-b px-4 md:px-6 h-14 z-10 sticky top-0 bg-white'>
          <Sheet>
            <div className='flex items-center gap-4'>
              <SheetTrigger asChild>
                <Button variant={'outline'} size={'icon'} className='md:hidden'>
                  <ListIcon className=' w-5 h-5' />
                </Button>
              </SheetTrigger>
              <h1 className='text-base md:text-lg font-semibold'>
                Menu OdontoPro
              </h1>
            </div>
            <SheetContent side='left' className='sm:max-w-xs text-black'>
              <SheetTitle>OdontoPRO</SheetTitle>
              <SheetDescription>
                <nav className='grid gap-2 text-base pt-5'>
                  <SideBarLink
                    href='/dashboard'
                    label='Agendamentos'
                    pathname={pathname}
                    iscollapsed={isCollapsed}
                    icon={<CalendarCheck2Icon />}
                  />

                  <SideBarLink
                    href='/dashboard/services'
                    label='Serviços'
                    pathname={pathname}
                    iscollapsed={isCollapsed}
                    icon={<FolderCog2Icon />}
                  />

                  <SideBarLink
                    href='/dashboard/profile'
                    label='Meu Perfil'
                    pathname={pathname}
                    iscollapsed={isCollapsed}
                    icon={<Settings2Icon />}
                  />

                  <SideBarLink
                    href='/dashboard/plans'
                    label='Planos'
                    pathname={pathname}
                    iscollapsed={isCollapsed}
                    icon={<Banknote />}
                  />
                </nav>
              </SheetDescription>
            </SheetContent>
          </Sheet>
        </header>
        <main className=' flex-1 py-4 px-2 md:p-6'>{children}</main>
      </div>
    </div>
  );
}

type SideBarLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  pathname: string;
  iscollapsed: boolean;
};

function SideBarLink({
  href,
  icon,
  label,
  pathname,
  iscollapsed,
}: SideBarLinkProps) {
  return (
    <Link href={href}>
      <div
        className={clsx(
          'flex items-center gap-2 px-3 py-2 rounded-md transition-colors',
          {
            'text-white bg-blue-500': pathname === href,
            'text-gray-700 hover:bg-gray-100': pathname !== href,
          }
        )}
      >
        <span className='w-6 h-6'>{icon}</span>
        {!iscollapsed && <span>{label}</span>}
      </div>
    </Link>
  );
}
