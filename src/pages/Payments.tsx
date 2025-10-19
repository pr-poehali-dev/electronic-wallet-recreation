import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Payments = () => {
  const navigate = useNavigate();
  const [apiKey] = useState('pk_live_51HxYz2...');
  const [copied, setCopied] = useState(false);

  const apiEndpoints = [
    { method: 'POST', endpoint: '/api/v1/payments/create', description: 'Создать платёж' },
    { method: 'GET', endpoint: '/api/v1/payments/:id', description: 'Получить статус платежа' },
    { method: 'POST', endpoint: '/api/v1/payments/:id/confirm', description: 'Подтвердить платёж' },
    { method: 'POST', endpoint: '/api/v1/payments/:id/refund', description: 'Вернуть платёж' }
  ];

  const recentPayments = [
    { id: 'pay_1x2y3z', merchant: 'Amazon', amount: 5499, status: 'success', date: '19 окт, 14:32', country: 'RU' },
    { id: 'pay_4a5b6c', merchant: 'Steam Store', amount: 1899, status: 'success', date: '19 окт, 12:15', country: 'US' },
    { id: 'pay_7d8e9f', merchant: 'Spotify', amount: 299, status: 'pending', date: '19 окт, 09:47', country: 'SE' },
    { id: 'pay_0g1h2i', merchant: 'Netflix', amount: 599, status: 'success', date: '18 окт, 21:03', country: 'US' },
    { id: 'pay_3j4k5l', merchant: 'AliExpress', amount: 2340, status: 'failed', date: '18 окт, 18:25', country: 'CN' }
  ];

  const integrationStats = [
    { label: 'Активные интеграции', value: '12', icon: 'Plug', color: 'gradient-purple' },
    { label: 'Успешных платежей', value: '1,429', icon: 'CheckCircle2', color: 'gradient-blue' },
    { label: 'Общий оборот', value: '₽2.4M', icon: 'TrendingUp', color: 'gradient-orange' },
    { label: 'Средний чек', value: '₽1,680', icon: 'DollarSign', color: 'gradient-purple' }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c1f] via-[#1a1535] to-[#0f0c1f] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full glass-effect"
              onClick={() => navigate('/')}
            >
              <Icon name="ArrowLeft" className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                API Интеграция
              </h1>
              <p className="text-gray-400 mt-1">Приём платежей для вашего бизнеса</p>
            </div>
          </div>
          <Badge className="glass-effect border-0 text-white px-4 py-2">
            <Icon name="Sparkles" className="h-4 w-4 mr-2" />
            Business Account
          </Badge>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-scale-in">
          {integrationStats.map((stat, idx) => (
            <Card key={idx} className={`${stat.color} border-0 text-white card-hover`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon name={stat.icon} className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card className="glass-effect border-0 text-white animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Key" className="h-5 w-5" />
                  API Ключи
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Используйте эти ключи для интеграции платежей
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Публичный ключ (Production)</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={apiKey}
                      readOnly
                      className="glass-effect border-white/10 text-white font-mono"
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="glass-effect border-white/10 hover:bg-white/10"
                      onClick={copyToClipboard}
                    >
                      <Icon name={copied ? "Check" : "Copy"} className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 pt-4">
                  <Button className="gradient-purple border-0 font-semibold">
                    <Icon name="Eye" className="mr-2 h-4 w-4" />
                    Показать секретный ключ
                  </Button>
                  <Button variant="outline" className="glass-effect border-white/10 hover:bg-white/10 font-semibold">
                    <Icon name="RotateCw" className="mr-2 h-4 w-4" />
                    Обновить ключи
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="endpoints" className="animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Документация API</h3>
                <TabsList className="glass-effect border-0">
                  <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
                  <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
                  <TabsTrigger value="examples">Примеры</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="endpoints">
                <Card className="glass-effect border-0 text-white">
                  <CardContent className="p-6 space-y-4">
                    {apiEndpoints.map((endpoint, idx) => (
                      <div key={idx}>
                        <div className="flex items-start gap-4">
                          <Badge className={`${
                            endpoint.method === 'POST' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                          } border-0 font-mono`}>
                            {endpoint.method}
                          </Badge>
                          <div className="flex-1">
                            <code className="text-purple-400 font-mono text-sm">{endpoint.endpoint}</code>
                            <p className="text-gray-400 text-sm mt-1">{endpoint.description}</p>
                          </div>
                          <Button variant="ghost" size="sm" className="hover:bg-white/5">
                            <Icon name="ExternalLink" className="h-4 w-4" />
                          </Button>
                        </div>
                        {idx < apiEndpoints.length - 1 && <Separator className="bg-white/10 mt-4" />}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="webhooks">
                <Card className="glass-effect border-0 text-white">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="mb-2 block">Webhook URL</Label>
                        <Input 
                          placeholder="https://yourdomain.com/webhooks/payments"
                          className="glass-effect border-white/10 text-white"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button className="gradient-blue border-0">
                          <Icon name="Plus" className="mr-2 h-4 w-4" />
                          Добавить Webhook
                        </Button>
                        <Button variant="outline" className="glass-effect border-white/10">
                          Тестировать
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="examples">
                <Card className="glass-effect border-0 text-white">
                  <CardContent className="p-6">
                    <pre className="bg-black/40 rounded-lg p-4 overflow-x-auto">
                      <code className="text-sm text-green-400">{`const payment = await fetch('https://api.paywallet.com/v1/payments/create', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer pk_live_...',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: 5000,
    currency: 'RUB',
    description: 'Покупка товара #12345'
  })
});`}</code>
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card className="glass-effect border-0 text-white animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Activity" className="h-5 w-5" />
                  Последние транзакции
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  {recentPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors mb-2">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${
                          payment.status === 'success' ? 'gradient-blue' : 
                          payment.status === 'pending' ? 'gradient-orange' : 
                          'bg-red-500/20'
                        }`}>
                          <Icon name={
                            payment.status === 'success' ? 'CheckCircle2' : 
                            payment.status === 'pending' ? 'Clock' : 
                            'XCircle'
                          } className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">{payment.merchant}</p>
                          <p className="text-sm text-gray-400">{payment.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{payment.amount.toLocaleString('ru-RU')} ₽</p>
                        <Badge variant="outline" className="text-xs border-white/20">
                          {payment.id}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 animate-slide-up">
            <Card className="glass-effect border-0 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Zap" className="h-5 w-5" />
                  Быстрая интеграция
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Начните принимать платежи за 5 минут
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                    <div className="w-8 h-8 rounded-full gradient-purple flex items-center justify-center font-bold">
                      1
                    </div>
                    <span className="text-sm">Скопируйте API ключ</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                    <div className="w-8 h-8 rounded-full gradient-blue flex items-center justify-center font-bold">
                      2
                    </div>
                    <span className="text-sm">Интегрируйте код</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                    <div className="w-8 h-8 rounded-full gradient-orange flex items-center justify-center font-bold">
                      3
                    </div>
                    <span className="text-sm">Начните принимать платежи</span>
                  </div>
                </div>
                <Separator className="bg-white/10" />
                <Button className="w-full gradient-purple border-0 font-semibold">
                  <Icon name="BookOpen" className="mr-2 h-4 w-4" />
                  Полная документация
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-effect border-0 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Code2" className="h-5 w-5" />
                  SDK и библиотеки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'JavaScript', icon: 'FileCode', color: 'text-yellow-400' },
                  { name: 'Python', icon: 'FileCode', color: 'text-blue-400' },
                  { name: 'PHP', icon: 'FileCode', color: 'text-purple-400' },
                  { name: 'Ruby', icon: 'FileCode', color: 'text-red-400' }
                ].map((sdk, idx) => (
                  <Button 
                    key={idx}
                    variant="outline" 
                    className="w-full glass-effect border-white/10 hover:bg-white/10 justify-start"
                  >
                    <Icon name={sdk.icon} className={`mr-2 h-4 w-4 ${sdk.color}`} />
                    {sdk.name} SDK
                    <Icon name="Download" className="ml-auto h-4 w-4" />
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-effect border-0 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BarChart3" className="h-5 w-5" />
                  Статистика за месяц
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Успешность</span>
                    <span className="font-bold text-green-400">98.5%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full gradient-blue" style={{ width: '98.5%' }}></div>
                  </div>
                </div>
                <Separator className="bg-white/10" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Обработано</span>
                    <span className="font-semibold">1,429</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Возвраты</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Средний чек</span>
                    <span className="font-semibold">₽1,680</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
