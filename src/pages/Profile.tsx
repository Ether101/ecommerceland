
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Profile = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to log out");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 flex items-center justify-center">
          <div className="animate-pulse text-2xl">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 px-6 sm:px-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-heading font-medium mb-8">Your Profile</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-medium text-gray-500">Email</h2>
                <p className="text-lg">{user.email}</p>
              </div>
              
              <div>
                <h2 className="text-sm font-medium text-gray-500">Account ID</h2>
                <p className="text-sm font-mono text-gray-600">{user.id}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => navigate("/orders")} variant="outline">
              View Order History
            </Button>
            <Button onClick={handleSignOut} variant="destructive">
              Sign Out
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
