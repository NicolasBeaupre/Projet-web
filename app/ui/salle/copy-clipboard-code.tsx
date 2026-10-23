import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
} from "@/components/ui/code-block"



export function Copiecode({lien}:{lien:string}) {
  return (
    <div className="w-full max-w-md ">
      <CodeBlock className="bg-transparent border-0">
        <CodeBlockActions>
          <CodeBlockCopyButton value={lien} />
        </CodeBlockActions>
        <CodeBlockContent className="text-2xl">{lien}</CodeBlockContent>
      </CodeBlock>
    </div>
  )
}
