import { Link } from "wouter";
import { Heart, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ManhwaCard } from "@/components/manhwa-card";

interface Favorite {
  id: string;
  title: string;
  imageSrc: string;
}

export default function Favorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const favsRef = collection(db, "users", user.uid, "favorites");
      const q = query(favsRef, orderBy("addedAt", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const favsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Favorite));
        setFavorites(favsList);
        setIsLoading(false);
      }, (err) => {
        setError("Gagal memuat favorit.");
        setIsLoading(false);
      });

      return () => unsubscribe();
    } else {
      setIsLoading(false);
      // Handle guest user if you have local favorites
    }
  }, [user]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="h-7 w-7 text-primary" />
        <h1 className="font-display text-3xl font-bold">Favorit Saya</h1>
      </div>

      {isLoading && (
        <div className="flex justify-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {error && (
        <div className="text-center py-20">
          <AlertCircle className="h-16 w-16 mx-auto text-destructive mb-4" />
          <h2 className="text-2xl font-bold mb-2">Terjadi Kesalahan</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      )}

      {!isLoading && !error && favorites.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-2">Belum Ada Favorit</h2>
          <p className="text-muted-foreground mb-6">
            Tambahkan manhwa ke favoritmu dan akan muncul di sini.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 min-h-9 px-4 py-2"
          >
            Cari Manhwa
          </Link>
        </div>
      )}

      {!isLoading && favorites.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {favorites.map((fav) => (
            <ManhwaCard
              key={fav.id}
              link={`/manhwa/${fav.id}`}
              title={fav.title}
              image={fav.imageSrc}
              latestChapter="" // You might want to fetch this data as well
            />
          ))}
        </div>
      )}
    </div>
  );
}
