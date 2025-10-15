"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Wallet, Send, ExternalLink } from "lucide-react"
import { WalletConnect } from "@/components/wallet-connect"
import { BatchTransfer } from "@/components/batch-transfer"

// 模拟用户评论数据
const comments = [
  {
    id: 1,
    avatar: "/user-avatar-1.png",
    name: "Alice Chen",
    comment: "Excited about this collaboration! Looking forward to the innovative solutions.",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  },
  {
    id: 2,
    avatar: "/diverse-user-avatar-set-2.png",
    name: "Bob Smith",
    comment: "Great partnership between two amazing projects!",
    address: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
  },
  {
    id: 3,
    avatar: "/diverse-user-avatars-3.png",
    name: "Carol Wang",
    comment: "This is exactly what the ecosystem needs. Bullish!",
    address: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
  },
  {
    id: 4,
    avatar: "/user-avatar-4.png",
    name: "David Lee",
    comment: "Amazing to see both teams working together.",
    address: "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
  },
  {
    id: 5,
    avatar: "/user-avatar-5.png",
    name: "Emma Johnson",
    comment: "The future of Web3 collaboration starts here!",
    address: "0x2546BcD3c84621e976D8185a91A922aE77ECEc30",
  },
]

export default function CollaborationPage() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [showBatchTransfer, setShowBatchTransfer] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header with wallet connect */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold text-foreground">Project Collaboration</h1>
          <WalletConnect
            connected={walletConnected}
            address={walletAddress}
            onConnect={(address) => {
              setWalletConnected(true)
              setWalletAddress(address)
            }}
            onDisconnect={() => {
              setWalletConnected(false)
              setWalletAddress("")
            }}
          />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Partnership logos section */}
        <section className="mb-12">
          <div className="flex items-center justify-center gap-8 rounded-lg border border-border bg-card p-8">
            <div className="flex-1 flex justify-end">
              <div className="relative h-32 w-32 overflow-hidden rounded-lg border-2 border-primary bg-muted">
                <img src="/project-logo-a.jpg" alt="Project A" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-px w-16 bg-primary" />
              <span className="text-sm font-mono text-primary uppercase tracking-wider">Partnership</span>
              <div className="h-px w-16 bg-primary" />
            </div>
            <div className="flex-1 flex justify-start">
              <div className="relative h-32 w-32 overflow-hidden rounded-lg border-2 border-primary bg-muted">
                <img src="/project-logo-b.jpg" alt="Project B" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Main content grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Twitter embed */}
          <Card className="overflow-hidden border-border bg-card">
            <div className="border-b border-border bg-muted/50 px-4 py-3">
              <div className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-card-foreground">Twitter Announcement</h2>
              </div>
            </div>
            <div className="aspect-[9/16] w-full">
              <iframe
                src="https://twitter.com/vercel/status/1234567890"
                className="h-full w-full"
                title="Twitter Post"
              />
            </div>
          </Card>

          {/* Right: Comments list */}
          <Card className="flex flex-col border-border bg-card">
            <div className="border-b border-border bg-muted/50 px-4 py-3">
              <h2 className="text-sm font-semibold text-card-foreground">Community Comments</h2>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="rounded-lg border border-border bg-background p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 border border-border">
                        <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {comment.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{comment.name}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{comment.comment}</p>
                        </div>
                        <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-1.5">
                          <Wallet className="h-3 w-3 text-muted-foreground" />
                          <code className="text-xs font-mono text-muted-foreground">{comment.address}</code>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </main>

      {/* Batch transfer button - fixed bottom right */}
      <div className="fixed bottom-8 right-8">
        <Button
          size="lg"
          className="h-14 gap-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
          onClick={() => setShowBatchTransfer(true)}
          disabled={!walletConnected}
        >
          <Send className="h-5 w-5" />
          Batch Transfer
        </Button>
      </div>

      {/* Batch transfer modal */}
      <BatchTransfer
        open={showBatchTransfer}
        onOpenChange={setShowBatchTransfer}
        recipients={comments.map((c) => c.address)}
        walletConnected={walletConnected}
      />
    </div>
  )
}
