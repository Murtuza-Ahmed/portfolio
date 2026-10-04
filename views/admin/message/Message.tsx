"use client";

import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Eye, Trash2, Mail } from "lucide-react";
import axios from "axios";
import { format } from "date-fns";
import type { ContactMessage } from "@/lib/types";
import type { ContactMessagesResponse } from "@/lib/types/api";

export default function Message() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewingMessage, setViewingMessage] =
    useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, [currentPage, searchTerm]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await axios.get(`/api/admin/messages?${params}`);
      if (response.data.success) {
        const data: ContactMessagesResponse = response.data;
        setMessages(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (messageId: string, status: string) => {
    try {
      await axios.put(`/api/admin/messages/${messageId}`, { status });
      fetchMessages(); // Refresh the list
    } catch (error) {
      console.error("Failed to update message status:", error);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      await axios.delete(`/api/admin/messages/${messageId}`);
      fetchMessages(); // Refresh the list
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "read":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "replied":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="flex h-screen">
        <AdminSidebar />

        <div className="flex-1 lg:ml-64">
          <AdminHeader
            title="Messages"
            description="Manage contact form submissions"
          />

          <main className="p-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Contact Messages</CardTitle>
                </div>

                {/* Search */}
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search messages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>From</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Received</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          Loading messages...
                        </TableCell>
                      </TableRow>
                    ) : messages.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          No messages found
                        </TableCell>
                      </TableRow>
                    ) : (
                      messages.map((message) => (
                        <TableRow key={message._id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{message.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {message.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs">
                              <div className="font-medium line-clamp-1">
                                {message.subject}
                              </div>
                              <div className="text-sm text-muted-foreground line-clamp-2">
                                {message.message}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(message.status)}>
                              {message.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {format(
                              new Date(message.createdAt),
                              "MMM dd, yyyy"
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => setViewingMessage(message)}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                {message.status === "unread" && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleUpdateStatus(message._id, "read")
                                    }
                                  >
                                    <Mail className="mr-2 h-4 w-4" />
                                    Mark as Read
                                  </DropdownMenuItem>
                                )}
                                {message.status !== "replied" && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleUpdateStatus(message._id, "replied")
                                    }
                                  >
                                    <Mail className="mr-2 h-4 w-4" />
                                    Mark as Replied
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleDeleteMessage(message._id)
                                  }
                                  className="text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </p>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1)
                          )
                        }
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      {/* View Details Dialog */}
      <Dialog
        open={viewingMessage !== null}
        onOpenChange={(open) => {
          if (!open) setViewingMessage(null);
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          {viewingMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Name
                  </p>
                  <p className="text-sm">{viewingMessage.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Email
                  </p>
                  <p className="text-sm break-all">{viewingMessage.email}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Subject
                </p>
                <p className="text-sm">{viewingMessage.subject}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Message
                </p>
                <p className="text-sm whitespace-pre-wrap">
                  {viewingMessage.message}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  <Badge className={getStatusColor(viewingMessage.status)}>
                    {viewingMessage.status}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-muted-foreground">
                    Received
                  </p>
                  <p className="text-sm">
                    {format(
                      new Date(viewingMessage.createdAt),
                      "MMM dd, yyyy 'at' h:mm a"
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ProtectedRoute>
  );
}
