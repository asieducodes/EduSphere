import { Outlet, NavLink } from "react-router-dom";
import { Home, Users, BookOpen, Map, User } from "lucide-react";

const navItems = [
  { to: "/home",      icon: Home,     label: "Home"      },
  { to: "/groups",    icon: Users,    label: "Groups"    },
  { to: "/resources", icon: BookOpen, label: "Resources" },
  { to: "/map",       icon: Map,      label: "Map"       },
  { to: "/profile",   icon: User,     label: "Profile"   },
];

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white relative">
      {/* Page content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom navigation — matches Stitch mockup */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 z-50">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-colors ${
                  isActive
                    ? "text-gold-500"
                    : "text-gray-400 hover:text-gray-600"
                }`
              }
            >
              <Icon size={22} strokeWidth={1.8} />
              <span className="text-[10px] font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
