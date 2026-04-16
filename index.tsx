import React from 'react';
import { createRoot } from 'react-dom/client';
import { Deck, Slide } from 'spectacle';
import Flowchart from 'flowchart-react/dist/index.js';
import type { ConnectionData, NodeData } from 'flowchart-react/dist/schema';
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiGitBranch,
  FiHelpCircle,
  FiMessageCircle,
  FiNavigation,
  FiRefreshCw,
  FiSearch,
  FiShoppingBag,
  FiSmartphone,
  FiUser,
  FiZap,
} from 'react-icons/fi';

const RED = '#FF5A66';
const BLACK = '#FFFFFF';
const MUTED = '#C8CDD6';
const LINE = '#2A2D34';
const BACKGROUND = '#050505';
const SURFACE = '#111111';
const BLUE = '#E8F4FF';
const BLUE_STROKE = '#1570A6';
const YELLOW = '#FFF5C2';
const YELLOW_STROKE = '#D6A300';
const PINK = '#FFE7F5';
const GREEN = '#E8F7ED';
const A4_LANDSCAPE_SIZE = {
  width: 1122.52,
  height: 793.7,
};

const evidenceImages = [
  new URL('./assets/pdf-images/evidencia-001.png', import.meta.url).href,
  new URL('./assets/pdf-images/evidencia-004.png', import.meta.url).href,
  new URL('./assets/pdf-images/evidencia-010.png', import.meta.url).href,
];

type SlideFrameProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  dense?: boolean;
  centerContent?: boolean;
};

const theme = {
  size: A4_LANDSCAPE_SIZE,
  colors: {
    primary: BLACK,
    secondary: RED,
    tertiary: MUTED,
    quaternary: BACKGROUND,
  },
  fonts: {
    header: '"Inter", "Aptos", "Segoe UI", Arial, sans-serif',
    text: '"Inter", "Aptos", "Segoe UI", Arial, sans-serif',
  },
};

const globalStyles = `
  * { box-sizing: border-box; }
  body { margin: 0; background: ${BACKGROUND}; color: ${BLACK}; }
  html,
  body,
  #app {
    width: 100%;
    height: 100%;
  }
  .spectacle-content { max-width: none !important; width: 100% !important; height: 100% !important; }
  .flowchart-container svg { background: ${BACKGROUND} !important; }
  .flowchart-container .toolbar { display: none !important; }

  @media print {
    @page {
      size: A4 landscape;
      margin: 0;
    }

    html,
    body,
    #app,
    #root {
      width: 297mm !important;
      min-height: 210mm !important;
      height: auto !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: visible !important;
      background: ${BACKGROUND} !important;
    }

    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .spectacle-content {
      width: 297mm !important;
      height: auto !important;
      min-height: 210mm !important;
      max-width: none !important;
      overflow: visible !important;
      background: ${BACKGROUND} !important;
    }

    .spectacle-content > div,
    [style*="break-after: page"] {
      width: 297mm !important;
      min-width: 297mm !important;
      max-width: 297mm !important;
      height: 210mm !important;
      min-height: 210mm !important;
      max-height: 210mm !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
      break-after: page !important;
      page-break-after: always !important;
      background: ${BACKGROUND} !important;
    }

    [style*="break-after: page"] > div,
    [style*="break-after: page"] > div > div {
      width: 297mm !important;
      height: 210mm !important;
      min-width: 297mm !important;
      min-height: 210mm !important;
      max-width: 297mm !important;
      max-height: 210mm !important;
      position: relative !important;
      inset: auto !important;
      overflow: hidden !important;
      background: ${BACKGROUND} !important;
    }
  }
`;

const PrintDeck = Deck as React.ComponentType<
  React.ComponentProps<typeof Deck> & { pageSize?: string }
>;

const SlideFrame = ({ eyebrow, title, subtitle, children, dense = false, centerContent = false }: SlideFrameProps) => (
  <Slide backgroundColor={BACKGROUND} padding={0}>
    <style>{globalStyles}</style>
    <div style={styles.stage}>
      <div style={{ ...styles.content, ...(centerContent ? styles.contentCenter : {}) }}>
        {eyebrow && <div style={styles.eyebrow}>{eyebrow}</div>}
        {title && <h1 style={dense ? styles.titleDense : styles.title}>{title}</h1>}
        {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
        {children && <div style={{ ...(dense ? styles.bodyDense : styles.body), ...(centerContent ? styles.bodyCenter : {}) }}>{children}</div>}
      </div>
    </div>
  </Slide>
);

const Bullets = ({ items }: { items: React.ReactNode[] }) => (
  <ul style={styles.bullets}>
    {items.map((item, index) => (
      <li key={index} style={styles.bullet}>
        {item}
      </li>
    ))}
  </ul>
);

const Card = ({
  title,
  children,
  accent = RED,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  accent?: string;
  icon?: React.ReactNode;
}) => (
  <div style={styles.card}>
    <div style={{ ...styles.cardAccent, background: accent }} />
    <div style={icon ? styles.cardHeader : styles.cardHeaderNoIcon}>
      {icon && <div style={{ ...styles.cardIcon, color: accent }}>{icon}</div>}
      <h3 style={styles.cardTitle}>{title}</h3>
    </div>
    <div style={styles.cardText}>{children}</div>
  </div>
);

const EvidenceStrip = () => (
  <div style={styles.evidenceStrip}>
    {evidenceImages.map((src, index) => (
      <img key={src} src={src} alt={`Registro visual da ocorrência ${index + 1}`} style={styles.evidenceImage} />
    ))}
  </div>
);

const Tag = ({ children }: { children: React.ReactNode }) => <span style={styles.tag}>{children}</span>;

const ImpactItem = ({ title, text }: { title: string; text: string }) => (
  <div style={styles.impactItem}>
    <strong style={styles.impactTitle}>{title}</strong>
    <span style={styles.impactText}>{text}</span>
  </div>
);

const nodeStyle = (fill: string, stroke: string) => ({
  fill,
  stroke,
});

const FLOW_NODE_TEXT_STYLE: React.CSSProperties = {
  color: '#FFFFFF',
  fontSize: 21,
  fontWeight: 850,
  lineHeight: 1.08,
  padding: '0 10px',
};

const flowLabel = (label: string) => <div style={FLOW_NODE_TEXT_STYLE}>{label}</div>;

const flowNodeStyle = nodeStyle(SURFACE, RED);
const flowTextStyle = { fill: '#FFFFFF' };

const futureNodes: NodeData[] = [
  { id: 1, type: 'start', title: flowLabel('Início: Meus Pedidos'), x: 30, y: 250, width: 150, height: 70, containerProps: flowNodeStyle, textProps: flowTextStyle },
  { id: 2, title: flowLabel('Selecionar pedido específico'), x: 225, y: 250, width: 170, height: 70, containerProps: flowNodeStyle, textProps: flowTextStyle },
  { id: 3, type: 'decision', title: flowLabel('Pedido cancelado ou confirmado?'), x: 460, y: 230, width: 185, height: 110, containerProps: flowNodeStyle, textProps: flowTextStyle },

  { id: 4, title: flowLabel('Cancelado: fluxo de estorno'), x: 725, y: 85, width: 180, height: 70, containerProps: flowNodeStyle, textProps: flowTextStyle },
  { id: 5, type: 'decision', title: flowLabel('Carta de estorno disponível?'), x: 970, y: 65, width: 180, height: 110, containerProps: flowNodeStyle, textProps: flowTextStyle },
  { id: 6, title: flowLabel('Exibe carta ou solicita confirmação'), x: 1220, y: 85, width: 195, height: 75, containerProps: flowNodeStyle, textProps: flowTextStyle },
  { id: 7, type: 'end', title: flowLabel('Fim: estorno'), x: 1475, y: 90, width: 145, height: 65, containerProps: flowNodeStyle, textProps: flowTextStyle },

  { id: 8, title: flowLabel('Confirmado: devolução / troca'), x: 725, y: 420, width: 190, height: 70, containerProps: flowNodeStyle, textProps: flowTextStyle },
  { id: 9, type: 'decision', title: flowLabel('Existe caso aberto?'), x: 980, y: 400, width: 170, height: 105, containerProps: flowNodeStyle, textProps: flowTextStyle },
  { id: 10, title: flowLabel('Exibe caso encontrado e detalhe'), x: 1220, y: 320, width: 195, height: 75, containerProps: flowNodeStyle, textProps: flowTextStyle },
  { id: 11, title: flowLabel('Exibe botões de ação'), x: 1220, y: 510, width: 180, height: 70, containerProps: flowNodeStyle, textProps: flowTextStyle },

  { id: 12, title: flowLabel('Solicitar devolução'), x: 1465, y: 425, width: 175, height: 65, containerProps: flowNodeStyle, textProps: flowTextStyle },
  { id: 13, type: 'decision', title: flowLabel('Tipo de problema?'), x: 1695, y: 405, width: 170, height: 105, containerProps: flowNodeStyle, textProps: flowTextStyle },
  { id: 14, title: flowLabel('Entrega: texto + enviar + confirmação'), x: 1925, y: 330, width: 205, height: 80, containerProps: flowNodeStyle, textProps: flowTextStyle },
  { id: 15, title: flowLabel('Defeito ou arrependimento: informa processo'), x: 1925, y: 485, width: 205, height: 85, containerProps: flowNodeStyle, textProps: flowTextStyle },

  { id: 16, title: flowLabel('Assistência técnica'), x: 1465, y: 620, width: 175, height: 65, containerProps: flowNodeStyle, textProps: flowTextStyle },
  { id: 17, type: 'decision', title: flowLabel('Há informação da marca?'), x: 1695, y: 600, width: 175, height: 105, containerProps: flowNodeStyle, textProps: flowTextStyle },
  { id: 18, title: flowLabel('Exibe assistência ou opções padrão'), x: 1925, y: 620, width: 205, height: 80, containerProps: flowNodeStyle, textProps: flowTextStyle },
  { id: 19, type: 'end', title: flowLabel('Fim do fluxo'), x: 2200, y: 450, width: 145, height: 65, containerProps: flowNodeStyle, textProps: flowTextStyle },
];

const c = (
  sourceId: number,
  destinationId: number,
  sourcePosition: ConnectionData['source']['position'] = 'right',
  destinationPosition: ConnectionData['destination']['position'] = 'left',
  title?: string,
  color = '#667085'
): ConnectionData => ({
  source: { id: sourceId, position: sourcePosition },
  destination: { id: destinationId, position: destinationPosition },
  title,
  color,
});

const futureConnections: ConnectionData[] = [
  c(1, 2),
  c(2, 3),
  c(3, 4, 'right', 'left', 'Cancelado', RED),
  c(4, 5),
  c(5, 6, 'right', 'left', 'Sim / Não'),
  c(6, 7),
  c(3, 8, 'right', 'left', 'Confirmado', '#2E7D32'),
  c(8, 9),
  c(9, 10, 'right', 'left', 'Sim', '#2E7D32'),
  c(10, 19),
  c(9, 11, 'right', 'left', 'Não', RED),
  c(11, 12),
  c(11, 16),
  c(12, 13),
  c(13, 14, 'right', 'left', 'Entrega', RED),
  c(13, 15, 'right', 'left', 'Defeito / arrependimento', '#2E7D32'),
  c(14, 19),
  c(15, 19),
  c(16, 17),
  c(17, 18, 'right', 'left', 'Sim / Não'),
  c(18, 19),
];

const stepNode = (
  id: number,
  title: string,
  x: number,
  y: number,
  width = 190,
  height = 82,
  type?: NodeData['type']
): NodeData => ({
  id,
  type,
  title: flowLabel(title),
  x,
  y,
  width,
  height,
  containerProps: flowNodeStyle,
  textProps: flowTextStyle,
});

const FlowStep = ({
  nodes,
  connections,
  width = 1180,
  height = 430,
  scaleOverride,
}: {
  nodes: NodeData[];
  connections: ConnectionData[];
  width?: number;
  height?: number;
  scaleOverride?: number;
}) => {
  const scale = scaleOverride ?? (width > 1250 ? 0.66 : 0.82);

  return (
    <div style={styles.stepFlowShell}>
      <div style={styles.flowLegend}>
        <Tag>Decisão</Tag>
        <Tag>Ação orientada</Tag>
        <Tag>Próximo passo claro</Tag>
        <Tag>Contexto preservado</Tag>
      </div>
      <div style={styles.stepFlowViewport}>
        <div style={{ ...styles.stepFlowCanvas, width, height, transform: `scale(${scale})` }}>
          <Flowchart
            readonly
            showToolbar={false}
            nodes={nodes}
            connections={connections}
            style={{ width, height }}
            className="flowchart-container"
          />
        </div>
      </div>
    </div>
  );
};

const flowStepEntryNodes: NodeData[] = [
  stepNode(1, 'Início: cliente acessa Meus Pedidos', 40, 165, 215, 88, 'start'),
  stepNode(2, 'Selecionar pedido específico', 325, 165, 205, 88),
  stepNode(3, 'Pedido cancelado ou confirmado?', 610, 140, 220, 132, 'decision'),
  stepNode(4, 'Cancelado: seguir para estorno', 920, 70, 210, 88),
  stepNode(5, 'Confirmado: seguir para devolução / troca', 910, 275, 230, 92),
];

const flowStepEntryConnections: ConnectionData[] = [
  c(1, 2),
  c(2, 3),
  c(3, 4, 'right', 'left', 'Cancelado', RED),
  c(3, 5, 'right', 'left', 'Confirmado', '#2E7D32'),
];

const flowStepRefundNodes: NodeData[] = [
  stepNode(1, 'Fluxo de estorno', 35, 165, 190, 88),
  stepNode(2, 'Visualizar detalhes do pedido', 300, 165, 220, 88),
  stepNode(3, 'Carta de estorno disponível?', 595, 140, 215, 132, 'decision'),
  stepNode(4, 'Exibe PDF / imagem da carta', 895, 70, 230, 88),
  stepNode(5, 'Solicitar carta e confirmar solicitação', 880, 275, 250, 92),
  stepNode(6, 'Fim do fluxo de estorno', 1210, 165, 210, 88, 'end'),
];

const flowStepRefundConnections: ConnectionData[] = [
  c(1, 2),
  c(2, 3),
  c(3, 4, 'right', 'left', 'Sim', '#2E7D32'),
  c(3, 5, 'right', 'left', 'Não', RED),
  c(4, 6),
  c(5, 6),
];

const flowStepCaseNodes: NodeData[] = [
  stepNode(1, 'Fluxo de devolução / troca', 40, 165, 235, 88),
  stepNode(2, 'Visualizar detalhes do pedido', 340, 165, 220, 88),
  stepNode(3, 'Existe caso aberto?', 625, 140, 190, 132, 'decision'),
  stepNode(4, 'Exibe status e informações do caso', 895, 70, 250, 92),
  stepNode(5, 'Ver detalhes do caso existente', 1220, 70, 230, 88),
  stepNode(6, 'Exibe botões de ação', 910, 275, 205, 88),
];

const flowStepCaseConnections: ConnectionData[] = [
  c(1, 2),
  c(2, 3),
  c(3, 4, 'right', 'left', 'Sim', '#2E7D32'),
  c(4, 5),
  c(3, 6, 'right', 'left', 'Não', RED),
];

const flowStepReturnNodes: NodeData[] = [
  stepNode(1, 'Exibe botões de ação', 35, 165, 205, 88),
  stepNode(2, 'Solicitar devolução', 305, 165, 205, 88),
  stepNode(3, 'Selecionar produtos da devolução', 565, 165, 240, 88),
  stepNode(4, 'Selecionar tipo de problema', 875, 140, 215, 132, 'decision'),
  stepNode(5, 'Problema de entrega: coletar informações', 1175, 60, 260, 96),
  stepNode(6, 'Enviar mensagem e confirmar envio', 1510, 60, 245, 92),
  stepNode(7, 'Defeito / arrependimento: informar processo', 1175, 275, 270, 96),
  stepNode(8, 'Fim do fluxo', 1495, 245, 190, 88, 'end'),
];

const flowStepReturnConnections: ConnectionData[] = [
  c(1, 2),
  c(2, 3),
  c(3, 4),
  c(4, 5, 'right', 'left', 'Entrega', RED),
  c(5, 6),
  c(6, 8, 'bottom', 'top'),
  c(4, 7, 'right', 'left', 'Defeito / arrependimento', '#2E7D32'),
  c(7, 8),
];

const flowStepAssistanceNodes: NodeData[] = [
  stepNode(1, 'Exibe botões de ação', 45, 165, 205, 88),
  stepNode(2, 'Assistência técnica', 325, 165, 205, 88),
  stepNode(3, 'Há informação da marca?', 610, 140, 205, 132, 'decision'),
  stepNode(4, 'Exibe contatos e procedimentos da marca', 900, 65, 275, 96),
  stepNode(5, 'Exibe opções padrão: devolução ou atendimento', 890, 275, 295, 96),
  stepNode(6, 'Fim do fluxo', 1260, 170, 190, 88, 'end'),
];

const flowStepAssistanceConnections: ConnectionData[] = [
  c(1, 2),
  c(2, 3),
  c(3, 4, 'right', 'left', 'Sim', '#2E7D32'),
  c(3, 5, 'right', 'left', 'Não', RED),
  c(4, 6),
  c(5, 6),
];

const Presentation = () => (
  <PrintDeck theme={theme} printScale={1} pageSize="A4 landscape">
    <SlideFrame
      centerContent
      eyebrow="Analisando o Contexto"
      title="Abertura de casos via Chatbot"
      subtitle="Onde a jornada quebra e o SAC absorve o problema"
    >
      <div style={styles.coverMeta}>
        <Tag>Cancelamento</Tag>
        <Tag>Troca</Tag>
        <Tag>Atrasos de Entrega</Tag>
        <Tag>Suporte</Tag>
      </div>
    </SlideFrame>

    <SlideFrame
      centerContent
      eyebrow="Resumo"
      title="Transição forçada"
      subtitle="Do Site/App para o WhatsApp"
    >
    </SlideFrame>

    <SlideFrame centerContent>
      <div style={styles.grid3}>
        <Card title="Migração forçada para WhatsApp" icon={<FiMessageCircle size={30} />}>
          As ocorrências mostram clientes saindo de Site/App para WhatsApp para tentar concluir cancelamento, troca, atrasos de entrega ou suporte. A mudança de canal não aparece como escolha de conveniência, mas como caminho necessário para avançar.
        </Card>
        <Card title="Perda de protagonismo do App e Site" icon={<FiSmartphone size={30} />}>
          O App e o Site perdem protagonismo quando não oferecem um caminho acionável dentro de Meus Pedidos. A consulta existe, mas a resolução passa a depender de outro canal.
        </Card>
        <Card title="Resolução imprevisível" icon={<FiClock size={30} />}>
          A resolução fica imprevisível: o cliente não sabe se conseguirá concluir sozinho, se precisará esperar ou se será transferido. Isso aumenta ansiedade e reduz confiança no autosserviço.
        </Card>
      </div>
    </SlideFrame>

    <SlideFrame eyebrow="Contexto" title="Meus Pedidos como o centro da resolução pós-compra">
      <div style={styles.grid3}>
        <Card title="Padrão esperado" icon={<FiShoppingBag size={30} />}>O cliente consulta o pedido e encontra ações claras: cancelar, trocar, devolver, acompanhar caso ou pedir suporte.</Card>
        <Card title="Comportamento observado" icon={<FiNavigation size={30} />}>Quando App ou Site não avançam, o cliente migra para WhatsApp e reinicia parte da jornada.</Card>
        <Card title="Implicação" icon={<FiAlertTriangle size={30} />}>O WhatsApp vira canal de compensação, não apenas de conveniência, e o SAC absorve a falha de autosserviço.</Card>
      </div>
    </SlideFrame>

    <SlideFrame eyebrow="Leitura das ocorrências" title="As ocorrências convergem para quatro padrões de jornada">
      <div style={styles.grid2}>
        <Card title="1. Ruptura omnicanal" icon={<FiGitBranch size={30} />}>App ou Site não sustentam a resolução e empurram a continuidade para WhatsApp.</Card>
        <Card title="2. Baixa autonomia no pedido" icon={<FiSearch size={30} />}>A consulta existe, mas nem sempre oferece ação contextual para resolver a demanda.</Card>
        <Card title="3. Desalinhamento de intenção" icon={<FiHelpCircle size={30} />}>A jornada apresenta informação disponível sobre o pedido, como status logístico, mas não conduz o cliente para a ação que ele realmente busca: cancelar, trocar ou abrir uma solicitação.</Card>
        <Card title="4. Resolução imprevisível" icon={<FiClock size={30} />}>O cliente não sabe onde acompanhar, quanto tempo deve esperar, qual será o próximo passo e em que momento o atendimento humano entra na resolução.</Card>
      </div>
    </SlideFrame>

    <SlideFrame eyebrow="Padrão 1" title="A ruptura de jornada nasce quando o Site/App não fecha o ciclo">
      <div style={styles.insightLayout}>
        <div style={styles.bigNumber}>01</div>
        <div>
          <p style={styles.statement}>
            O cliente começa no App ou no Site, não encontra uma saída suficiente e abandona o canal original para buscar suporte na Weni.
          </p>
          <div style={styles.twoColumnsCompact}>
            <Bullets
              items={[
                <>A jornada perde continuidade: pedido, histórico e intenção não chegam ao WhatsApp com contexto suficiente.</>,
                <>O esforço percebido aumenta porque o cliente precisa concluir fora do ambiente onde iniciou a compra.</>,
              ]}
            />
            <EvidenceStrip />
          </div>
        </div>
      </div>
    </SlideFrame>

    <SlideFrame eyebrow="Padrão 2" title="Quando Meus Pedidos não é acionável, o WhatsApp vira rota obrigatória">
      <div style={styles.grid2}>
        <Card title="Sinal observado" accent="#8A1C1C" icon={<FiSearch size={30} />}>
          A jornada indica que Site e Aplicativo têm informações estruturais, mas não as apresentam de forma suficientemente acionável para o pedido.
        </Card>
        <Card title="Referência de mercado" accent="#8A1C1C" icon={<FiShoppingBag size={30} />}>
          Em jornadas maduras de e-commerce, a área de pedidos concentra status, elegibilidade, prazos, ações e acompanhamento de solicitações.
        </Card>
        <Card title="Impacto no cliente" accent="#8A1C1C" icon={<FiUser size={30} />}>
          A pessoa deixa de ter previsibilidade sobre o que pode resolver sozinha e passa a depender de redirecionamento.
        </Card>
        <Card title="Impacto no SAC" accent="#8A1C1C" icon={<FiMessageCircle size={30} />}>
          O humano passa a absorver demandas que poderiam começar estruturadas no App/Site, com pedido, motivo e ação já definidos.
        </Card>
      </div>
    </SlideFrame>

    <SlideFrame eyebrow="Padrão 3" title="Informação de pedido não é o mesmo que resolução da demanda">
      <div style={styles.twoColumns}>
        <div>
          <p style={styles.statement}>
            A jornada pode retornar status logístico, enquanto a necessidade real do cliente é cancelamento, troca ou abertura de solicitação.
          </p>
          <Bullets
            items={[
              <>Há informação sobre o pedido, mas falta condução para a ação que o cliente precisa executar.</>,
              <>Status, NFe ou entrega ajudam, mas não substituem um fluxo de cancelamento, troca ou suporte.</>,
              <>Sem confirmação de intenção, a jornada responde ao contexto errado e aumenta tentativa e erro.</>,
            ]}
          />
        </div>
        <div style={styles.intentBox}>
          <div style={styles.intentRow}><span>Informação disponível</span><strong>Status do pedido</strong></div>
          <div style={styles.intentRow}><span>Objetivo real</span><strong>Cancelamento / chamado</strong></div>
          <div style={styles.intentRow}><span>Falha de jornada</span><strong>Não transformar contexto em ação</strong></div>
        </div>
      </div>
    </SlideFrame>

    <SlideFrame eyebrow="Padrão 4" title="A resolução fica imprevisível quando depende do canal humano">
      <div style={styles.grid2}>
        <Card title="Sintomas" icon={<FiRefreshCw size={30} />}>Redirecionamento, repetição de informações, espera, falta de resposta acionável e dúvida sobre o próximo passo.</Card>
        <Card title="Horário comercial" icon={<FiClock size={30} />}>Quando a conclusão depende do humano, demandas fora do horário comercial perdem capacidade imediata de resolução.</Card>
        <Card title="Previsibilidade" icon={<FiNavigation size={30} />}>O cliente não sabe onde acompanhar, quanto tempo deve esperar, qual será o próximo passo e em que momento o atendimento humano entra na resolução.</Card>
        <Card title="Efeito no SAC" icon={<FiUser size={30} />}>O humano entra para resolver a demanda e também para organizar contexto, expectativa e continuidade.</Card>
      </div>
    </SlideFrame>

    <SlideFrame eyebrow="UX e autosserviço" title="O problema é desenho de jornada: contexto, ação e continuidade entre canais">
      <div style={styles.principles}>
        {[
          'App/Site como centro da resolução pós-compra',
          'Ações contextuais dentro de Meus Pedidos',
          'Confirmação de intenção antes do redirecionamento',
          'Continuidade de contexto até o WhatsApp',
          'Redução de esforço cognitivo',
          'Transferência humana com pedido, motivo e histórico da tentativa',
          'Previsibilidade sobre prazo e canal',
          'Transparência sobre o que pode ser resolvido',
          'Autosserviço fora do horário comercial com acompanhamento contínuo no App/Site',
        ].map((item) => (
          <div key={item} style={styles.principleItem}>{item}</div>
        ))}
      </div>
    </SlideFrame>

    <SlideFrame eyebrow="Impactos para o SAC" title="O SAC absorve a baixa resolutividade do App/Site">
      <div style={styles.impactList}>
        <ImpactItem title="Mais contatos evitáveis" text="Demandas que poderiam começar no autosserviço chegam ao humano sem estrutura suficiente." />
        <ImpactItem title="Mais recontextualização" text="O atendente precisa reconstruir pedido, intenção, canal de origem e tentativas anteriores." />
        <ImpactItem title="Clientes mais ansiosos" text="A pessoa chega após migração de canal, espera e baixa clareza sobre possibilidade de resolução." />
        <ImpactItem title="Menor eficiência operacional" text="O time humano resolve o caso e compensa lacunas de navegação, contexto e previsibilidade." />
      </div>
    </SlideFrame>

    <SlideFrame eyebrow="Princípios de redesenho" title="O novo fluxo deve devolver protagonismo ao App e ao Site">
      <div style={styles.grid3}>
        <Card title="Centralizar" icon={<FiShoppingBag size={30} />}>Trazer cancelamento, troca, devolução, assistência e casos para a área de pedido.</Card>
        <Card title="Contextualizar" icon={<FiSearch size={30} />}>Mostrar ações conforme status, produto, elegibilidade e histórico de solicitação.</Card>
        <Card title="Confirmar" icon={<FiCheckCircle size={30} />}>Validar objetivo antes de abrir caso, orientar assistência ou redirecionar para WhatsApp.</Card>
        <Card title="Explicar" icon={<FiHelpCircle size={30} />}>Informar resultado, prazo, protocolo, restrição ou indisponibilidade de forma acionável.</Card>
        <Card title="Preservar contexto" icon={<FiGitBranch size={30} />}>Levar pedido, intenção, motivo e tentativa anterior para qualquer handoff humano.</Card>
        <Card title="Escalar com critério" icon={<FiZap size={30} />}>Usar WhatsApp e SAC para exceções, não como caminho padrão para demandas previsíveis.</Card>
      </div>
    </SlideFrame>

    <SlideFrame dense eyebrow="Fluxo futuro proposto" title="Etapa 1: a resolução começa dentro de Meus Pedidos">
      <FlowStep nodes={flowStepEntryNodes} connections={flowStepEntryConnections} />
    </SlideFrame>

    <SlideFrame dense eyebrow="Fluxo futuro proposto" title="Etapa 2: pedidos cancelados entram em uma jornada de estorno">
      <FlowStep nodes={flowStepRefundNodes} connections={flowStepRefundConnections} width={1450} />
    </SlideFrame>

    <SlideFrame dense eyebrow="Fluxo futuro proposto" title="Etapa 3: pedidos confirmados verificam se já existe caso aberto">
      <FlowStep nodes={flowStepCaseNodes} connections={flowStepCaseConnections} width={1480} />
    </SlideFrame>

    <SlideFrame dense eyebrow="Fluxo futuro proposto" title="Etapa 4: devolução começa pela seleção dos produtos">
      <FlowStep nodes={flowStepReturnNodes} connections={flowStepReturnConnections} width={1710} scaleOverride={0.54} />
    </SlideFrame>

    <SlideFrame dense eyebrow="Fluxo futuro proposto" title="Etapa 5: assistência técnica orienta antes de acionar atendimento humano">
      <FlowStep nodes={flowStepAssistanceNodes} connections={flowStepAssistanceConnections} width={1480} />
    </SlideFrame>

    <SlideFrame eyebrow="Encerramento" title="Redesenhar a abertura de casos melhora experiência e eficiência operacional">
      <div style={styles.twoColumns}>
        <Bullets
          items={[
            <>Hoje, o SAC absorve ruído gerado por baixa resolutividade no App/Site e migração forçada para WhatsApp.</>,
            <>O fluxo futuro reduz o salto desnecessário para humano ao orientar cada cenário dentro da jornada de pedido.</>,
            <>O ponto crítico é transformar informação de pedido em ação clara, previsível e acompanhável.</>,
          ]}
        />
        <div style={styles.closingBox}>
          <strong>Mensagem central</strong>
          <span>
            A abertura de casos precisa deixar de depender do WhatsApp como correção de rota e passar a funcionar como uma jornada guiada, transparente e contextual no App e no Site.
          </span>
        </div>
      </div>
    </SlideFrame>
  </PrintDeck>
);

const styles: Record<string, React.CSSProperties> = {
  stage: {
    position: 'relative',
    width: '100%',
    height: '100%',
    minHeight: '100%',
    background: BACKGROUND,
    overflow: 'hidden',
    color: BLACK,
    fontFamily: theme.fonts.text,
  },
  content: {
    width: '100%',
    height: '100%',
    minHeight: '100%',
    padding: '4.6vh 6.2vw 4.2vh 5.8vw',
    display: 'flex',
    flexDirection: 'column',
  },
  contentCenter: {
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
  eyebrow: {
    color: RED,
    fontSize: '1.02rem',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: 0,
    marginBottom: '1rem',
  },
  title: {
    margin: 0,
    maxWidth: '82%',
    color: BLACK,
    fontSize: '3.45rem',
    lineHeight: 1.02,
    fontWeight: 850,
    letterSpacing: 0,
  },
  titleDense: {
    margin: 0,
    maxWidth: '84%',
    color: BLACK,
    fontSize: '2.15rem',
    lineHeight: 1.04,
    fontWeight: 850,
    letterSpacing: 0,
  },
  subtitle: {
    maxWidth: '72%',
    margin: '1.2rem 0 0',
    color: MUTED,
    fontSize: '1.28rem',
    lineHeight: 1.32,
    fontWeight: 500,
  },
  body: {
    marginTop: '2.05rem',
    flex: 1,
  },
  bodyDense: {
    marginTop: '1.2rem',
    flex: 1,
    minHeight: 0,
  },
  bodyCenter: {
    marginTop: 0,
    flex: '0 0 auto',
  },
  bullets: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    display: 'grid',
    gap: '1.05rem',
  },
  bullet: {
    position: 'relative',
    paddingLeft: '1.45rem',
    color: BLACK,
    fontSize: '1.12rem',
    lineHeight: 1.28,
    fontWeight: 520,
    borderLeft: `5px solid ${RED}`,
  },
  twoColumns: {
    display: 'grid',
    gridTemplateColumns: '1.05fr 0.95fr',
    gap: '3rem',
    alignItems: 'start',
  },
  twoColumnsCompact: {
    display: 'grid',
    gridTemplateColumns: '1fr 0.95fr',
    gap: '1.4rem',
    alignItems: 'start',
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '1rem',
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '1rem',
  },
  card: {
    position: 'relative',
    minHeight: '8.6rem',
    padding: '1rem 1.1rem 1rem',
    border: `1px solid ${LINE}`,
    borderRadius: 8,
    background: SURFACE,
    boxShadow: '0 14px 30px rgba(0, 0, 0, 0.32)',
  },
  cardAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 7,
    height: '100%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  cardHeader: {
    display: 'grid',
    gridTemplateColumns: '2.35rem 1fr',
    gap: '0.8rem',
    alignItems: 'start',
    marginBottom: '0.75rem',
  },
  cardHeaderNoIcon: {
    marginBottom: '0.75rem',
  },
  cardIcon: {
    width: '2.35rem',
    height: '2.35rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    background: 'rgba(255, 90, 102, 0.14)',
  },
  cardTitle: {
    margin: 0,
    color: BLACK,
    fontSize: '1.12rem',
    lineHeight: 1.08,
    fontWeight: 840,
  },
  cardText: {
    color: MUTED,
    fontSize: '0.93rem',
    lineHeight: 1.32,
    fontWeight: 530,
  },
  coverMeta: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
    marginTop: '1rem',
  },
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    minHeight: 34,
    padding: '0.35rem 0.7rem',
    borderRadius: 6,
    border: `1px solid ${LINE}`,
    color: BLACK,
    background: SURFACE,
    fontSize: '0.85rem',
    lineHeight: 1.1,
    fontWeight: 780,
    whiteSpace: 'nowrap',
  },
  evidenceStrip: {
    display: 'grid',
    gap: '0.55rem',
    padding: '0.65rem',
    border: `1px solid ${LINE}`,
    borderRadius: 8,
    background: SURFACE,
  },
  evidenceImage: {
    display: 'block',
    width: '100%',
    height: '6.8rem',
    objectFit: 'cover',
    objectPosition: 'top left',
    borderRadius: 6,
    border: `1px solid ${LINE}`,
    background: SURFACE,
  },
  insightLayout: {
    display: 'grid',
    gridTemplateColumns: '7.2rem 1fr',
    gap: '1.7rem',
    alignItems: 'start',
  },
  bigNumber: {
    color: RED,
    fontSize: '5.9rem',
    fontWeight: 900,
    lineHeight: 0.9,
  },
  statement: {
    margin: '0 0 1.15rem',
    color: BLACK,
    fontSize: '1.52rem',
    lineHeight: 1.16,
    fontWeight: 780,
  },
  intentBox: {
    display: 'grid',
    gap: '1rem',
    padding: '1.25rem',
    borderRadius: 8,
    border: `1px solid ${LINE}`,
    background: SURFACE,
  },
  intentRow: {
    display: 'grid',
    gap: '0.3rem',
    paddingBottom: '1rem',
    borderBottom: `1px solid ${LINE}`,
    color: MUTED,
    fontSize: '1.05rem',
    fontWeight: 650,
  },
  principles: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '0.8rem',
  },
  principleItem: {
    minHeight: '4.35rem',
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 1.1rem',
    borderRadius: 8,
    border: `1px solid ${LINE}`,
    background: SURFACE,
    color: BLACK,
    fontSize: '0.98rem',
    lineHeight: 1.18,
    fontWeight: 760,
  },
  impactList: {
    display: 'grid',
    gap: '1rem',
  },
  flowShell: {
    width: '100%',
    maxWidth: '100%',
    height: '64vh',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gap: '0.8rem',
  },
  stepFlowShell: {
    width: '100%',
    maxWidth: '100%',
    height: '64vh',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gap: '0.7rem',
  },
  flowLegend: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.55rem',
  },
  flowViewport: {
    position: 'relative',
    overflow: 'hidden',
    border: `1px solid ${LINE}`,
    borderRadius: 8,
    background: BACKGROUND,
  },
  stepFlowViewport: {
    position: 'relative',
    overflow: 'hidden',
    border: `1px solid ${LINE}`,
    borderRadius: 8,
    background: BACKGROUND,
  },
  flowCanvas: {
    transform: 'scale(0.49)',
    transformOrigin: 'top left',
    width: 2380,
    height: 760,
  },
  stepFlowCanvas: {
    transformOrigin: 'top left',
  },
  impactItem: {
    minHeight: '4.8rem',
    display: 'grid',
    gridTemplateColumns: '0.42fr 1fr',
    gap: '1.2rem',
    alignItems: 'center',
    padding: '1.1rem 1.25rem',
    borderRadius: 8,
    border: `1px solid ${LINE}`,
    background: SURFACE,
  },
  impactTitle: {
    color: BLACK,
    fontSize: '1.08rem',
    lineHeight: 1.12,
    fontWeight: 850,
  },
  impactText: {
    color: MUTED,
    fontSize: '0.98rem',
    lineHeight: 1.25,
    fontWeight: 560,
  },
  closingBox: {
    padding: '1.15rem',
    borderRadius: 8,
    border: `1px solid ${LINE}`,
    background: SURFACE,
    display: 'grid',
    gap: '0.8rem',
    color: BLACK,
    fontSize: '1.24rem',
    lineHeight: 1.25,
  },
};

createRoot(document.getElementById('app')!).render(<Presentation />);
