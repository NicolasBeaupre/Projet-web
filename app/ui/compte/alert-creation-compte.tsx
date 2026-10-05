import { CheckCircle2Icon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertBasic() {
  return (
    <Alert className="max-w-md">
      <CheckCircle2Icon />
      <AlertTitle>Compte créé avec succès</AlertTitle>
      <AlertDescription>
        Votre compte à été créé avec succès. Connectez-vous pour y avoir accès. 
      </AlertDescription>
    </Alert>
  )
}
