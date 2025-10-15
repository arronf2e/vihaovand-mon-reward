"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Send, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BatchTransferProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  recipients: string[]
  walletConnected: boolean
}

export function BatchTransfer({ open, onOpenChange, recipients, walletConnected }: BatchTransferProps) {
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { toast } = useToast()

  const handleTransfer = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    // 模拟批量转账过程
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setLoading(false)
    setSuccess(true)

    toast({
      title: "Transfer Successful",
      description: `Successfully sent ${amount} ETH to ${recipients.length} addresses`,
    })

    setTimeout(() => {
      setSuccess(false)
      setAmount("")
      onOpenChange(false)
    }, 2000)
  }

  const totalAmount = amount ? (Number.parseFloat(amount) * recipients.length).toFixed(4) : "0"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Batch Transfer</DialogTitle>
          <DialogDescription>Send tokens to {recipients.length} addresses simultaneously</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount per address (ETH)</Label>
            <Input
              id="amount"
              type="number"
              step="0.0001"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={loading || success}
            />
          </div>

          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Recipients:</span>
              <span className="font-semibold text-foreground">{recipients.length}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Total Amount:</span>
              <span className="font-semibold text-foreground">{totalAmount} ETH</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Recipient Addresses</Label>
            <ScrollArea className="h-[200px] rounded-md border border-border bg-background p-3">
              <div className="space-y-2">
                {recipients.map((address, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-md bg-muted px-3 py-2 text-xs font-mono"
                  >
                    <span className="text-muted-foreground">{index + 1}.</span>
                    <span className="flex-1 ml-2 text-foreground">{address}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleTransfer}
            disabled={loading || success || !walletConnected}
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : success ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Success!
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Transfer
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
