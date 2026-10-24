import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
} from "@/components/ui/code-block"



export function CopieLien({lien}:{lien:string}) {
  return (
    <div className="w-full max-w-md">
      <CodeBlock>
        <CodeBlockActions>
          <CodeBlockCopyButton value={lien} />
        </CodeBlockActions>
        <CodeBlockContent>{lien}</CodeBlockContent>
      </CodeBlock>
    </div>
  )
}
