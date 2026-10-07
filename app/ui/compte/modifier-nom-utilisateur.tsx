import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { User } from '@supabase/supabase-js'

export function DialogModificationUsername({ user }: { user: User }) {

  return (
    <Dialog>
      <form>
        <DialogTrigger render={<Button variant="outline">Midifier</Button>} />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Modifier le nom du profil</DialogTitle>
            <DialogDescription>
              Changer votre nom d'utilisateur ici. Ne divulgez pas d'information personnelle dans votre nom de profil
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue={user.user_metadata.username}/>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Annuler</Button>} />
            <Button type="submit" variant="destructive">Sauvegarder</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
