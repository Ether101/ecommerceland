
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useOrders } from "@/hooks/useOrders";
import { Link } from "react-router-dom";

const getBadgeColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-100 text-green-800";
    case "shipped":
      return "bg-blue-100 text-blue-800";
    case "processing":
      return "bg-amber-100 text-amber-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const OrderHistory = () => {
  const { orders, loading } = useOrders();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 px-6 sm:px-10 pb-20">
        <div className="max-w-5xl mx-auto animate-slide-up">
          <h1 className="text-3xl font-heading font-medium mb-8">Order History</h1>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-pulse text-xl">Loading your orders...</div>
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-6">
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className={cn(
                            "px-2.5 py-0.5 rounded-full text-xs font-medium",
                            getBadgeColor(order.status)
                          )}>
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="md:hidden">
                <Accordion type="single" collapsible className="w-full">
                  {orders.map((order) => (
                    <AccordionItem key={order.id} value={order.id}>
                      <AccordionTrigger className="py-4 px-1">
                        <div className="flex items-center justify-between w-full pr-4">
                          <div className="font-medium">{order.id}</div>
                          <div>
                            <span className={cn(
                              "px-2.5 py-0.5 rounded-full text-xs font-medium",
                              getBadgeColor(order.status)
                            )}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pb-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Date:</span>
                            <span>{new Date(order.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Items:</span>
                            <span>{order.items.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total:</span>
                            <span className="font-medium">${order.total.toFixed(2)}</span>
                          </div>
                          <div className="border-t pt-3 mt-3">
                            <Button variant="outline" size="sm" className="w-full">View Details</Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 border rounded-lg">
              <h3 className="text-xl font-medium mb-2">No orders yet</h3>
              <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
              <Link to="/products">
                <Button>Start Shopping</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderHistory;
