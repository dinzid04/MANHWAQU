import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, BookOpen, Moon, Sun, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/components/theme-provider";
import { useAuth } from "@/hooks/use-auth";
import { AuthModal } from "@/components/auth-modal";
import { getAuth, signOut } from "firebase/auth";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setMobileMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between gap-4 px-4">
          {/* Logo */}
          <Link 
            href="/" 
            data-testid="link-home"
            className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-lg px-3 py-2 transition-all"
          >
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-bold tracking-tight">
              Manhwaku<span className="text-primary">V1</span>
            </span>
          </Link>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari manhwa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full pl-9 pr-4"
                data-testid="input-search"
              />
            </div>
          </form>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            <Link 
              href="/genres" 
              data-testid="link-genres"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground min-h-8 px-3 py-2 hover-elevate active-elevate-2"
            >
              Genre
            </Link>
              {user && (
                <>
                  <Link
                    href="/favorites"
                    data-testid="link-favorites"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground min-h-8 px-3 py-2 hover-elevate active-elevate-2"
                  >
                    Favorit
                  </Link>
                  <Link
                    href="/history"
                    data-testid="link-history"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground min-h-8 px-3 py-2 hover-elevate active-elevate-2"
                  >
                    Riwayat
                  </Link>
                </>
              )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover-elevate active-elevate-2"
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {!loading && (
              user ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{user.email}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className="hover-elevate active-elevate-2"
                    data-testid="button-logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <AuthModal />
              )
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover-elevate active-elevate-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-menu-toggle"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-background p-4 md:hidden">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari manhwa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full pl-9"
                  data-testid="input-search-mobile"
                />
              </div>
            </form>
            <div className="flex flex-col gap-2">
              <Link 
                href="/genres" 
                data-testid="link-genres-mobile"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-start gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground min-h-8 px-3 py-2 w-full hover-elevate active-elevate-2"
              >
                Genre
              </Link>
              {user && (
                <>
                  <Link
                    href="/favorites"
                    data-testid="link-favorites-mobile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center justify-start gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground min-h-8 px-3 py-2 w-full hover-elevate active-elevate-2"
                  >
                    Favorit
                  </Link>
                  <Link
                    href="/history"
                    data-testid="link-history-mobile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center justify-start gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground min-h-8 px-3 py-2 w-full hover-elevate active-elevate-2"
                  >
                    Riwayat
                  </Link>
                </>
              )}
              <Button
                variant="ghost"
                onClick={() => {
                  toggleTheme();
                  setMobileMenuOpen(false);
                }}
                className="justify-start hover-elevate active-elevate-2"
                data-testid="button-theme-toggle-mobile"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="mr-2 h-5 w-5" /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="mr-2 h-5 w-5" /> Dark Mode
                  </>
                )}
              </Button>
              <div className="border-t border-border my-2"></div>
              {!loading && (
                user ? (
                  <div className="flex flex-col gap-2">
                     <span className="text-sm font-medium px-3 py-2">{user.email}</span>
                     <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="justify-start hover-elevate active-elevate-2"
                      data-testid="button-logout-mobile"
                    >
                       <LogOut className="mr-2 h-5 w-5" /> Logout
                    </Button>
                  </div>
                ) : (
                  <div className="px-3 py-2">
                    <AuthModal />
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
