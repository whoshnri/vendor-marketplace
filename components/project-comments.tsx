"use client"

import { useState } from "react"
import { Send } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ProjectCommentsProps {
  commentCount: number
}

export function ProjectComments({ commentCount }: ProjectCommentsProps) {
  const [comment, setComment] = useState("")

  // Sample comments data
  const comments = [
    {
      id: "1",
      user: {
        name: "Jamie Chen",
        avatar: "/diverse-group-two.png",
      },
      content: "This is absolutely stunning work! Love the minimalist approach and the attention to detail.",
      timestamp: "2 days ago",
      likes: 24,
    },
    {
      id: "2",
      user: {
        name: "Sam Wilson",
        avatar: "/diverse-group-outdoors.png",
      },
      content: "The color palette is perfect for this brand. Would love to know more about your process!",
      timestamp: "1 day ago",
      likes: 18,
    },
    {
      id: "3",
      user: {
        name: "Taylor Reed",
        avatar: "/diverse-group-four.png",
      },
      content: "Great typography choices. The hierarchy works really well.",
      timestamp: "12 hours ago",
      likes: 9,
    },
  ]

  return (
    <div>
      <h2 className="text-xl font-semibold">Comments ({commentCount})</h2>
      <div className="mt-6 flex gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/diverse-group.png" alt="Your avatar" />
          <AvatarFallback>YA</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Add a comment..."
            className="min-h-[80px] resize-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button disabled={!comment.trim()}>
              <Send className="mr-2 h-4 w-4" />
              Post Comment
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-8 space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
              <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{comment.user.name}</h4>
                <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
              </div>
              <p className="mt-1 text-sm">{comment.content}</p>
              <div className="mt-2 flex items-center gap-4">
                <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground">
                  Like ({comment.likes})
                </Button>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground">
                  Reply
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
