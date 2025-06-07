import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle, Database } from 'lucide-react'

export default function SanityStatus() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [projectInfo, setProjectInfo] = useState<any>(null)

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    try {
      // Test connection by fetching project info
      const result = await client.fetch('*[_type == "siteSettings"][0]')
      setStatus('connected')
      setProjectInfo(result)
    } catch (error) {
      console.log('Sanity CMS not configured or connection failed:', error)
      setStatus('error')
    }
  }

  if (status === 'checking') {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Verificando CMS...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Conectando ao Sanity CMS...
          </p>
        </CardContent>
      </Card>
    )
  }

  if (status === 'error') {
    return (
      <Card className="w-full max-w-md border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            CMS Não Configurado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            O site está usando dados de exemplo. Para editar o conteúdo, configure o Sanity CMS:
          </p>
          <div className="space-y-2 text-sm">
            <p>1. Crie um projeto em <code className="bg-muted px-1 rounded">sanity.io</code></p>
            <p>2. Configure as variáveis de ambiente</p>
            <p>3. Reinicie a aplicação</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700">
          <CheckCircle className="h-5 w-5" />
          CMS Conectado
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Sanity CMS Ativo
          </Badge>
          <p className="text-sm text-muted-foreground">
            Conteúdo editável via Sanity Studio
          </p>
          {projectInfo && (
            <p className="text-xs text-muted-foreground">
              Site: {projectInfo.siteName || 'Academia Boulder'}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}