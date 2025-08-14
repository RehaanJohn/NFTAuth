"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, GraduationCap, Shield, Wallet, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: GraduationCap,
  },
  {
    name: "University",
    href: "/university",
    icon: Building2,
    description: "Issue credentials",
  },
  {
    name: "Verify",
    href: "/verify",
    icon: Shield,
    description: "Verify credentials",
  },
  {
    name: "Student",
    href: "/student",
    icon: Wallet,
    description: "View your diplomas",
  },
]

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-gradient-to-r from-white via-slate-50 to-white backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-lg shadow-slate-200/20">
      <div className="container flex h-20 items-center px-6">
        <div className="mr-8 hidden md:flex">
          <Link href="/" className="mr-10 flex items-center space-x-3 group">
            <div className="relative">
              <GraduationCap className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-200" />
              <div className="absolute -inset-1 bg-blue-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
            </div>
            <span className="hidden font-bold text-xl sm:inline-block text-slate-900 tracking-tight">NFTAuth</span>
          </Link>
          <nav className="flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-semibold transition-all duration-200 rounded-lg hover:bg-slate-100/80",
                  pathname === item.href
                    ? "text-blue-600 bg-blue-50/80 shadow-sm"
                    : "text-slate-700 hover:text-slate-900",
                )}
              >
                {item.name}
                {pathname === item.href && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-3 py-2 text-base hover:bg-slate-100 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden text-slate-900 rounded-lg"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 bg-gradient-to-b from-white to-slate-50 border-slate-200">
            <Link href="/" className="flex items-center space-x-3 text-slate-900 mb-8" onClick={() => setIsOpen(false)}>
              <GraduationCap className="h-7 w-7 text-blue-600" />
              <span className="font-bold text-lg">NFTAuth</span>
            </Link>
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-xl hover:bg-white/80 hover:shadow-sm",
                    pathname === item.href
                      ? "text-blue-600 bg-blue-50/80 shadow-sm border border-blue-100"
                      : "text-slate-700 hover:text-slate-900",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <div>
                    <span>{item.name}</span>
                    {item.description && <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="flex items-center space-x-3 md:hidden group">
              <div className="relative">
                <GraduationCap className="h-7 w-7 text-blue-600 group-hover:text-blue-700 transition-colors duration-200" />
                <div className="absolute -inset-1 bg-blue-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
              </div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">NFTAuth</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
