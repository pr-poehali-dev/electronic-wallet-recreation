import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [balance] = useState(125847.50);
  const [selectedCard, setSelectedCard] = useState(0);

  const cards = [
    { id: 1, number: '**** 4532', balance: 45000, type: 'Visa', color: 'gradient-purple' },
    { id: 2, number: '**** 8891', balance: 30200, type: 'Mastercard', color: 'gradient-blue' },
    { id: 3, number: '**** 2347', balance: 50647.50, type: 'Visa', color: 'gradient-orange' }
  ];

  const transactions = [
    { id: 1, type: 'payment', name: 'Netflix', amount: -599, date: '19 окт', icon: 'Play', status: 'completed' },
    { id: 2, type: 'transfer', name: 'Иван Петров', amount: -5000, date: '18 окт', icon: 'ArrowRightLeft', status: 'completed' },
    { id: 3, type: 'income', name: 'Зарплата', amount: 85000, date: '15 окт', icon: 'TrendingUp', status: 'completed' },
    { id: 4, type: 'payment', name: 'Spotify', amount: -299, date: '14 окт', icon: 'Music', status: 'completed' },
    { id: 5, type: 'transfer', name: 'Анна Смирнова', amount: 3000, date: '12 окт', icon: 'ArrowRightLeft', status: 'completed' },
    { id: 6, type: 'payment', name: 'Steam', amount: -1899, date: '10 окт', icon: 'Gamepad2', status: 'pending' }
  ];

  const quickActions = [
    { label: 'Перевод', icon: 'Send', gradient: 'gradient-purple' },
    { label: 'Платёж', icon: 'CreditCard', gradient: 'gradient-blue' },
    { label: 'Пополнить', icon: 'Plus', gradient: 'gradient-orange' },
    { label: 'История', icon: 'Clock', gradient: 'gradient-purple' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c1f] via-[#1a1535] to-[#0f0c1f] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              PayWallet
            </h1>
            <p className="text-gray-400 mt-1">Добро пожаловать обратно!</p>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full glass-effect">
            <Icon name="Bell" className="h-5 w-5" />
          </Button>
        </header>

        <div className="glass-effect rounded-3xl p-8 animate-scale-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-gray-400 text-sm">Общий баланс</p>
              <h2 className="text-5xl font-bold mt-2">
                {balance.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽
              </h2>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="rounded-full glass-effect hover:scale-110 transition-transform">
                <Icon name="Eye" className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full glass-effect hover:scale-110 transition-transform">
                <Icon name="Settings" className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, idx) => (
              <Button 
                key={idx}
                className={`${action.gradient} h-24 rounded-2xl flex flex-col gap-2 card-hover border-0 text-white font-semibold`}
              >
                <Icon name={action.icon} className="h-6 w-6" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="animate-slide-up">
              <h3 className="text-2xl font-bold mb-4">Мои карты</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {cards.map((card, idx) => (
                  <div
                    key={card.id}
                    onClick={() => setSelectedCard(idx)}
                    className={`${card.color} rounded-3xl p-6 cursor-pointer card-hover ${
                      selectedCard === idx ? 'ring-4 ring-white ring-opacity-50' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-8">
                      <Icon name="CreditCard" className="h-8 w-8 text-white" />
                      <Badge className="bg-white/20 text-white border-0">{card.type}</Badge>
                    </div>
                    <div className="space-y-3">
                      <p className="text-2xl font-mono font-bold text-white">{card.number}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-white/70">Баланс</p>
                          <p className="text-xl font-bold text-white">
                            {card.balance.toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                        <Icon name="Nfc" className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Tabs defaultValue="all" className="animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">История операций</h3>
                <TabsList className="glass-effect border-0">
                  <TabsTrigger value="all">Все</TabsTrigger>
                  <TabsTrigger value="income">Доходы</TabsTrigger>
                  <TabsTrigger value="expense">Расходы</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="space-y-3">
                <ScrollArea className="h-[400px] glass-effect rounded-2xl p-4">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors mb-2">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${tx.amount > 0 ? 'gradient-blue' : 'gradient-purple'}`}>
                          <Icon name={tx.icon} className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">{tx.name}</p>
                          <p className="text-sm text-gray-400">{tx.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-lg ${tx.amount > 0 ? 'text-green-400' : 'text-white'}`}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('ru-RU')} ₽
                        </p>
                        <Badge variant={tx.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                          {tx.status === 'completed' ? 'Выполнено' : 'В обработке'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="income" className="glass-effect rounded-2xl p-6">
                <p className="text-gray-400">Показаны только входящие платежи</p>
              </TabsContent>

              <TabsContent value="expense" className="glass-effect rounded-2xl p-6">
                <p className="text-gray-400">Показаны только исходящие платежи</p>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6 animate-slide-up">
            <Card className="glass-effect border-0 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Send" className="h-5 w-5" />
                  Быстрый перевод
                </CardTitle>
                <CardDescription className="text-gray-400">Отправить деньги за секунду</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Получатель</Label>
                  <Input 
                    id="recipient" 
                    placeholder="+7 (999) 123-45-67" 
                    className="glass-effect border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Сумма</Label>
                  <Input 
                    id="amount" 
                    type="number" 
                    placeholder="0.00" 
                    className="glass-effect border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>
                <Button className="w-full gradient-purple border-0 font-semibold hover:scale-105 transition-transform">
                  Отправить
                  <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-effect border-0 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Shield" className="h-5 w-5" />
                  Безопасность
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 gradient-blue rounded-lg">
                      <Icon name="Lock" className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm">2FA защита</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-0">Активна</Badge>
                </div>
                <Separator className="bg-white/10" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 gradient-orange rounded-lg">
                      <Icon name="Fingerprint" className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm">Биометрия</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-0">Включена</Badge>
                </div>
                <Separator className="bg-white/10" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 gradient-purple rounded-lg">
                      <Icon name="Mail" className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm">Email оповещения</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-0">Активны</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-0 text-white overflow-hidden">
              <div className="gradient-purple p-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon name="Zap" className="h-8 w-8 text-white" />
                  <Badge className="bg-white/20 text-white border-0">PRO</Badge>
                </div>
                <h3 className="text-xl font-bold mb-2">Премиум доступ</h3>
                <p className="text-sm text-white/80 mb-4">Больше возможностей и привилегий</p>
                <Button className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                  Узнать больше
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
