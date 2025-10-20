import { Link } from "wouter";
import { History as HistoryIcon, AlertCircle, Loader2, ExternalLink } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

interface HistoryItem {
  id: string;
  title: string;
  readAt: Date;
}

export default function History() {
  const { user } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const historyRef = collection(db, "users", user.uid, "history");
      const q = query(historyRef, orderBy("readAt", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const historyList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          readAt: doc.data().readAt.toDate(),
        } as HistoryItem));
        setHistory(historyList);
        setIsLoading(false);
      }, (err) => {
        setError("Gagal memuat riwayat.");
        setIsLoading(false);
      });

      return () => unsubscribe();
    } else {
      // Load from local storage for guests
      const localHistory = JSON.parse(localStorage.getItem("history") || "[]");
      setHistory(localHistory.map((item: any) => ({ ...item, readAt: new Date(item.readAt) })));
      setIsLoading(false);
    }
  }, [user]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <HistoryIcon className="h-7 w-7 text-primary" />
        <h1 className="font-display text-3xl font-bold">Riwayat Baca</h1>
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

      {!isLoading && !error && history.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-2">Riwayat Baca Kosong</h2>
          <p className="text-muted-foreground mb-6">
            Mulai membaca dan progresmu akan tersimpan di sini.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 min-h-9 px-4 py-2"
          >
            Cari Manhwa
          </Link>
        </div>
      )}

      {!isLoading && history.length > 0 && (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="divide-y divide-border">
            {history.map((item) => (
              <Link
                key={item.id}
                href={`/chapter/${item.id}`}
                className="flex items-center justify-between p-4 hover-elevate active-elevate-2 transition-all"
              >
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Dibaca {formatDistanceToNow(item.readAt, { addSuffix: true, locale: id })}
                  </p>
                </div>
                <ExternalLink className="h-5 w-5 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
