import { motion } from 'framer-motion';
import { BadgeCheck, BrainCircuit, ChartNoAxesCombined, Rocket, ServerCog } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Pricing = () => {
  const { language } = useLanguage();

  const content =
    language === 'ru'
      ? {
          title: 'Пакеты роста и масштабирования',
          subtitle:
            'Формат для собственников, которым нужен быстрый результат: фиксируем этапы в договоре, считаем эффект в деньгах и KPI.',
          plans: [
            {
              name: 'AI START',
              price: 'от 120 000 ₽',
              period: 'за проект / 2-3 недели',
              points: ['Стратегический AI-аудит', 'Карта точек роста и потерь', '1 пилотный AI-агент', 'Расчет ROI и план внедрения'],
              icon: Rocket,
            },
            {
              name: 'AI GROWTH',
              price: 'от 290 000 ₽',
              period: 'за проект / 4-6 недель',
              points: ['3-5 AI-агентов под ключ', 'Ускорение продаж и клиентского сервиса', 'Интеграции CRM/мессенджеры/аналитика', 'Обучение команды и регламенты'],
              icon: ChartNoAxesCombined,
              featured: true,
            },
            {
              name: 'CRISIS + AI',
              price: 'от 490 000 ₽',
              period: 'за проект / 6-10 недель',
              points: ['Антикризисная диагностика 360°', 'Финансовая и операционная стабилизация', 'Единый AI-контур управления', 'Сопровождение собственника и C-level'],
              icon: BrainCircuit,
            },
          ],
          bitrixTitle: 'Bitrix24 и 1C-Битрикс под ключ',
          bitrixText:
            'Создаем и дорабатываем сайты на 1C-Битрикс, глубоко связываем с Bitrix24 и автоматизируем путь клиента от лида до оплаты.',
          bitrixList: ['Сайты и лендинги на 1C-Битрикс', 'Интеграция с Bitrix24 CRM и воронкой', 'Автоматизация лидов/сделок/коммуникаций', 'Техподдержка, развитие, рост конверсии'],
          note:
            'Ориентиры актуальны на 22 февраля 2026 года по рынку РФ. Финальная стоимость зависит от глубины интеграций, объема данных и скорости внедрения.',
        }
      : language === 'zh'
      ? {
          title: '套餐与价格',
          subtitle: '2026年2月最新参考价：每个阶段在合同中固定，结果绑定KPI。',
          plans: [
            {
              name: 'AI START',
              price: '120,000 ₽ 起',
              period: '2-3周',
              points: ['流程审计', 'AI落地路线图', '1个试点智能体', '基础ROI分析'],
              icon: Rocket,
            },
            {
              name: 'AI GROWTH',
              price: '290,000 ₽ 起',
              period: '4-6周',
              points: ['3-5个部门智能体', '销售漏斗自动化', 'CRM/消息系统集成', '团队培训'],
              icon: ChartNoAxesCombined,
              featured: true,
            },
            {
              name: 'CRISIS + AI',
              price: '490,000 ₽ 起',
              period: '6-10周',
              points: ['危机诊断', '财务与运营稳定化', 'AI管理系统', '管理层支持'],
              icon: BrainCircuit,
            },
          ],
          bitrixTitle: 'Bitrix24 与 1C-Bitrix 全流程服务',
          bitrixText: '可创建和升级 1C-Bitrix 网站，并与 Bitrix24、电话、1C、广告和支付系统深度集成。',
          bitrixList: ['1C-Bitrix 网站开发', '网站与 Bitrix24 CRM 集成', '销售流程自动化', '持续技术支持'],
          note: '价格区间基于 2026年2月22日俄罗斯市场公开数据，最终价格取决于集成数量与架构复杂度。',
        }
      : {
          title: 'Packages & Pricing',
          subtitle: 'Updated for February 2026: each delivery stage is fixed in contract and linked to KPI impact.',
          plans: [
            {
              name: 'AI START',
              price: 'from 120,000 RUB',
              period: 'per project / 2-3 weeks',
              points: ['Process audit', 'AI rollout map', '1 pilot AI agent', 'Baseline ROI analytics'],
              icon: Rocket,
            },
            {
              name: 'AI GROWTH',
              price: 'from 290,000 RUB',
              period: 'per project / 4-6 weeks',
              points: ['3-5 departmental agents', 'Sales funnel automation', 'CRM/messaging integrations', 'Team enablement'],
              icon: ChartNoAxesCombined,
              featured: true,
            },
            {
              name: 'CRISIS + AI',
              price: 'from 490,000 RUB',
              period: 'per project / 6-10 weeks',
              points: ['Crisis diagnostics', 'Financial and ops stabilization', 'AI control layer', 'C-level execution support'],
              icon: BrainCircuit,
            },
          ],
          bitrixTitle: 'Bitrix24 + 1C-Bitrix Delivery',
          bitrixText:
            'We build and upgrade websites on 1C-Bitrix and integrate them with Bitrix24 CRM, telephony, accounting, ad, and payment stacks.',
          bitrixList: ['1C-Bitrix website development', 'Bitrix24 CRM integration', 'Lead and deal automation', 'Support and continuous upgrades'],
          note:
            'Price ranges are based on Russian market benchmarks as of February 22, 2026. Final budget depends on integration depth and architecture complexity.',
        };

  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-3xl md:text-5xl">{content.title}</h2>
          <p className="mt-4 text-muted-foreground">{content.subtitle}</p>
        </motion.div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {content.plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.article
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className={`relative overflow-hidden rounded-3xl border p-6 ${
                  plan.featured
                    ? 'border-primary/80 bg-gradient-to-b from-primary/15 via-card/90 to-card/85 shadow-[0_0_46px_hsl(var(--primary)/0.2)]'
                    : 'border-border/70 bg-card/75'
                }`}
              >
                <div className="mb-4 inline-flex rounded-xl border border-border/70 bg-background/70 p-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-2xl">{plan.name}</h3>
                <p className="mt-3 text-3xl font-semibold text-primary">{plan.price}</p>
                <p className="mt-1 text-xs text-muted-foreground">{plan.period}</p>
                <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
                  {plan.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <BadgeCheck className="mt-0.5 h-4 w-4 text-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-8 rounded-3xl border border-border/70 bg-card/75 p-7"
        >
          <div className="flex items-center gap-2">
            <ServerCog className="h-5 w-5 text-primary" />
            <h3 className="font-display text-2xl">{content.bitrixTitle}</h3>
          </div>
          <p className="mt-3 text-muted-foreground">{content.bitrixText}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {content.bitrixList.map((item) => (
              <div key={item} className="rounded-xl border border-border/70 bg-background/70 px-4 py-3 text-sm text-muted-foreground">
                {item}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">{content.note}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
