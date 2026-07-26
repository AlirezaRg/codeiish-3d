import { useEffect, useRef } from 'react';
import './SystemMap.css';

interface Category {
  id: string;
  label: string;
  color: string;
}

interface MapNode {
  id: string;
  label: string;
  category: string;
  x: number;
  y: number;
  meta: string;
}

const categories: Category[] = [
  { id: 'languages', label: 'LANGUAGES', color: '#ffb000' },
  { id: 'systems', label: 'SYSTEMS', color: '#4dd0e1' },
  { id: 'devops', label: 'DEVOPS', color: '#7c8cff' },
  { id: 'observability', label: 'OBSERVABILITY', color: '#ff6b6b' },
  { id: 'networking', label: 'NETWORKING', color: '#6bcb77' },
];

const nodes: MapNode[] = [
  { id: 'python', label: 'Python', category: 'languages', x: 12, y: 16, meta: 'primary' },
  { id: 'javascript', label: 'JavaScript', category: 'languages', x: 27, y: 8, meta: 'web' },
  { id: 'typescript', label: 'TypeScript', category: 'languages', x: 38, y: 18, meta: 'typed' },
  { id: 'bash', label: 'Bash', category: 'languages', x: 18, y: 30, meta: 'glue' },

  { id: 'linux', label: 'Linux', category: 'systems', x: 8, y: 52, meta: 'kernel' },
  { id: 'ubuntu', label: 'Ubuntu', category: 'systems', x: 20, y: 66, meta: 'lts' },
  { id: 'debian', label: 'Debian', category: 'systems', x: 9, y: 80, meta: 'stable' },

  { id: 'docker', label: 'Docker', category: 'devops', x: 45, y: 44, meta: 'runtime' },
  { id: 'kubernetes', label: 'Kubernetes', category: 'devops', x: 58, y: 30, meta: 'orchestration' },
  { id: 'git', label: 'Git', category: 'devops', x: 36, y: 62, meta: 'vcs' },
  { id: 'gitlab', label: 'GitLab CI/CD', category: 'devops', x: 50, y: 76, meta: 'pipelines' },

  { id: 'prometheus', label: 'Prometheus', category: 'observability', x: 74, y: 42, meta: 'metrics' },
  { id: 'grafana', label: 'Grafana', category: 'observability', x: 88, y: 30, meta: 'dashboards' },
  { id: 'elk', label: 'ELK Stack', category: 'observability', x: 80, y: 62, meta: 'logs' },
  { id: 'zabbix', label: 'Zabbix', category: 'observability', x: 92, y: 74, meta: 'alerting' },

  { id: 'tcpip', label: 'TCP/IP', category: 'networking', x: 62, y: 88, meta: 'transport' },
  { id: 'dns', label: 'DNS', category: 'networking', x: 74, y: 14, meta: 'resolution' },
  { id: 'http', label: 'HTTP', category: 'networking', x: 63, y: 58, meta: 'protocol' },
  { id: 'ssh', label: 'SSH', category: 'networking', x: 32, y: 88, meta: 'access' },
];

const edges: [string, string][] = [
  ['python', 'bash'], ['python', 'linux'], ['python', 'docker'],
  ['javascript', 'typescript'], ['typescript', 'http'],
  ['bash', 'linux'], ['bash', 'ssh'],
  ['linux', 'ubuntu'], ['linux', 'debian'], ['linux', 'docker'], ['ubuntu', 'docker'],
  ['docker', 'kubernetes'], ['docker', 'gitlab'], ['git', 'gitlab'], ['git', 'docker'],
  ['kubernetes', 'prometheus'], ['kubernetes', 'dns'],
  ['prometheus', 'grafana'], ['prometheus', 'zabbix'], ['elk', 'grafana'], ['elk', 'prometheus'],
  ['http', 'tcpip'], ['dns', 'tcpip'], ['ssh', 'tcpip'], ['http', 'kubernetes'], ['gitlab', 'tcpip'],
];

/**
 * Self-contained interactive tech-stack graph, ported from a standalone
 * vanilla-JS prototype. DOM is built/driven imperatively inside this
 * effect (not React state) since it's a direct port; all element lookups
 * are scoped under `rootRef` so ids can't collide with the rest of the app.
 */
export default function SystemMap() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const SVG_NS = 'http://www.w3.org/2000/svg';
    const byId = new Map(nodes.map((n) => [n.id, n]));
    const catLabel = new Map(categories.map((c) => [c.id, c.label]));
    const catColor = new Map(categories.map((c) => [c.id, c.color]));
    const colorOf = (node: MapNode) => catColor.get(node.category)!;

    const neighbours = new Map<string, Set<string>>();
    edges.forEach(([a, b]) => {
      if (!neighbours.has(a)) neighbours.set(a, new Set());
      if (!neighbours.has(b)) neighbours.set(b, new Set());
      neighbours.get(a)!.add(b);
      neighbours.get(b)!.add(a);
    });

    const map = root.querySelector<HTMLDivElement>('.sm-map')!;
    const svg = root.querySelector<SVGSVGElement>('.sm-edges')!;
    const nodeLayer = root.querySelector<HTMLDivElement>('.sm-nodes')!;
    const statusText = root.querySelector<HTMLSpanElement>('.sm-status span:last-child')!;
    const catList = root.querySelector<HTMLUListElement>('.sm-cats')!;

    const lineEls = edges.map(([a, b]) => {
      const from = byId.get(a)!;
      const to = byId.get(b)!;
      const line = document.createElementNS(SVG_NS, 'line');
      line.setAttribute('x1', String(from.x));
      line.setAttribute('y1', String(from.y));
      line.setAttribute('x2', String(to.x));
      line.setAttribute('y2', String(to.y));
      line.setAttribute('vector-effect', 'non-scaling-stroke');
      svg.appendChild(line);
      return { a, b, el: line };
    });

    const nodeEls = nodes.map((node) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'sm-node';
      button.dataset.nodeId = node.id;
      button.style.left = node.x + '%';
      button.style.top = node.y + '%';
      button.style.setProperty('--sm-node-color', colorOf(node));
      button.innerHTML =
        '<span class="sm-dot"></span><span class="sm-name"></span><span class="sm-meta"></span>';
      button.querySelector('.sm-name')!.textContent = node.label;
      button.querySelector('.sm-meta')!.textContent = node.meta;

      const hoverIn = () => {
        if (!pinnedNode) setFocus(node.id, activeCategory);
      };
      const hoverOut = () => {
        if (!pinnedNode) setFocus(null, activeCategory);
      };
      button.addEventListener('mouseenter', hoverIn);
      button.addEventListener('mouseleave', hoverOut);
      button.addEventListener('focus', hoverIn);
      button.addEventListener('blur', hoverOut);

      button.addEventListener('click', (event) => {
        event.stopPropagation();
        pinNode(pinnedNode === node.id ? null : node.id);
      });

      button.addEventListener('keydown', (event) => {
        const dirs: Record<string, number> = { ArrowRight: 0, ArrowLeft: 180, ArrowUp: 270, ArrowDown: 90 };
        if (!(event.key in dirs)) return;
        event.preventDefault();
        const target = nearestNeighbourInDirection(node, dirs[event.key]);
        if (target) {
          root.querySelector<HTMLButtonElement>(`[data-node-id="${target.id}"]`)?.focus();
        }
      });

      nodeLayer.appendChild(button);
      return { node, el: button };
    });

    categories.forEach((category) => {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'sm-cat';
      button.style.setProperty('--sm-cat-color', category.color);
      button.setAttribute('aria-pressed', 'false');
      button.innerHTML = '<span class="sm-cat-swatch"></span><span></span>';
      button.querySelector('span:last-child')!.textContent = category.label;

      const hoverIn = () => {
        if (!pinnedCategory) setFocus(pinnedNode, category.id);
      };
      const hoverOut = () => {
        if (!pinnedCategory) setFocus(pinnedNode, null);
      };
      button.addEventListener('mouseenter', hoverIn);
      button.addEventListener('mouseleave', hoverOut);
      button.addEventListener('focus', hoverIn);
      button.addEventListener('blur', hoverOut);
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        pinCategory(pinnedCategory === category.id ? null : category.id);
      });

      li.appendChild(button);
      catList.appendChild(li);
    });

    const onMapClick = () => {
      pinNode(null);
      pinCategory(null);
    };
    map.addEventListener('click', onMapClick);

    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        pinNode(null);
        pinCategory(null);
      }
    };
    document.addEventListener('keydown', onKeydown);

    const catButtons = [...catList.querySelectorAll<HTMLButtonElement>('.sm-cat')];
    const idleStatus = 'SYSTEM MAP — ' + nodes.length + ' NODES / ' + edges.length + ' LINKS';

    let activeNode: string | null = null;
    let activeCategory: string | null = null;
    let pinnedNode: string | null = null;
    let pinnedCategory: string | null = null;

    function pinNode(id: string | null) {
      pinnedNode = id;
      if (id) pinnedCategory = null;
      setFocus(id, id ? null : pinnedCategory);
    }

    function pinCategory(id: string | null) {
      pinnedCategory = id;
      if (id) pinnedNode = null;
      setFocus(pinnedNode, id);
    }

    function nearestNeighbourInDirection(node: MapNode, deg: number): MapNode | null {
      const ids = neighbours.get(node.id);
      if (!ids) return null;
      let best: MapNode | null = null;
      let bestScore = -Infinity;
      ids.forEach((id) => {
        const other = byId.get(id)!;
        const dx = other.x - node.x;
        const dy = other.y - node.y;
        const dist = Math.hypot(dx, dy) || 1;
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        const diff = Math.abs(((angle - deg + 540) % 360) - 180);
        if (diff > 80) return;
        const score = 1 / dist - diff / 4000;
        if (score > bestScore) {
          bestScore = score;
          best = other;
        }
      });
      return best;
    }

    function setFocus(nodeId: string | null, categoryId: string | null) {
      activeNode = nodeId;
      activeCategory = categoryId;

      const related = (id: string) => {
        if (activeNode) return activeNode === id || neighbours.get(activeNode)?.has(id);
        if (activeCategory) return byId.get(id)!.category === activeCategory;
        return true;
      };

      map.toggleAttribute('data-focused', Boolean(activeNode || activeCategory));

      nodeEls.forEach(({ node, el }) => {
        el.classList.toggle('is-faded', !related(node.id));
        el.classList.toggle('is-active', activeNode === node.id);
        el.classList.toggle('is-pinned', pinnedNode === node.id);
      });

      lineEls.forEach(({ a, b, el }) => {
        const lit = activeNode
          ? a === activeNode || b === activeNode
          : activeCategory
            ? byId.get(a)!.category === activeCategory || byId.get(b)!.category === activeCategory
            : false;
        el.classList.toggle('is-lit', lit);
        el.style.setProperty(
          '--sm-lit-color',
          activeNode ? colorOf(byId.get(activeNode)!) : activeCategory ? catColor.get(activeCategory)! : ''
        );
      });

      catButtons.forEach((button, i) => {
        button.setAttribute('aria-pressed', String(categories[i].id === activeCategory));
      });

      if (activeNode) {
        const node = byId.get(activeNode)!;
        const linkCount = neighbours.get(activeNode)?.size ?? 0;
        statusText.style.setProperty('--sm-status-color', colorOf(node));
        statusText.innerHTML = '';
        const name = document.createElement('b');
        name.textContent = node.label.toUpperCase() + ' — ';
        const cat = document.createElement('em');
        cat.textContent = catLabel.get(node.category)!;
        const links = document.createElement('u');
        links.textContent = ' · ' + linkCount + (linkCount === 1 ? ' LINK' : ' LINKS');
        statusText.append(name, cat, links);
      } else {
        statusText.style.removeProperty('--sm-status-color');
        statusText.textContent = idleStatus;
      }
    }

    setFocus(null, null);

    return () => {
      document.removeEventListener('keydown', onKeydown);
      map.removeEventListener('click', onMapClick);
      lineEls.forEach(({ el }) => el.remove());
      nodeEls.forEach(({ el }) => el.remove());
      catList.innerHTML = '';
    };
  }, []);

  return (
    <section
      className="sm bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24"
      id="tech"
      aria-labelledby="sm-title"
      ref={rootRef}
    >
      <div className="max-w-6xl mx-auto">
      <div className="sm-head">
        <div>
          <p className="sm-label">04 / TECHNOLOGY</p>
          <h2 className="sm-title" id="sm-title">
            The Stack
          </h2>
        </div>
        <ul className="sm-cats" />
      </div>

      <div className="sm-viewport">
        <div className="sm-map">
          <div className="sm-grid" aria-hidden="true" />
          <svg className="sm-edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" />
          <div className="sm-nodes" />
          <p className="sm-status" aria-live="polite">
            <span className="sm-dot" />
            <span />
          </p>
        </div>
      </div>
      <p className="sm-hint">
        <span className="sm-hint-desktop">← SCROLL THE MAP · CLICK A NODE TO PIN · ARROW KEYS TO TRAVEL EDGES →</span>
        <span className="sm-hint-touch">← SCROLL THE MAP · TAP A NODE →</span>
      </p>
      </div>
    </section>
  );
}
