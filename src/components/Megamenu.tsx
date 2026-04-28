'use client';

import Link from 'next/link';
import { AnimatePresence, motion} from "motion/react"
import { ReactNode, useState, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';


export default function NavMenu({ menuItems }: { menuItems: any }) {
  const [selected, setSelectedGlobal] = useState<number | null>(null);

  return (
    <div className="flex w-full justify-start p-8 md:justify-center">
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm z-40"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
            onClick={() => setSelectedGlobal(null)}
          />
        )}
      </AnimatePresence>
      <Tabs selected={selected} setSelected={setSelectedGlobal} menuItems={menuItems} />
    </div>
  );
};

const Tabs = ({ selected, setSelected, menuItems }: { selected: number | null; setSelected: (val: number | null) => void; menuItems: any }) => {
  const [dir, setDir] = useState<null | "l" | "r">(null);

  const handleSetSelected = (val: number | null) => {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l");
    } else if (val === null) {
      setDir(null);
    }

    setSelected(val);
  };

  return (
    <div
      onMouseLeave={() => handleSetSelected(null)}
      className="relative flex h-fit gap-2 z-50 bg-white rounded-full px-4 py-2"
    >
      {TABS.map((t) => {
        return (
          <Tab
            key={t.id}
            selected={selected}
            handleSetSelected={handleSetSelected}
            tab={t.id}          >
            {t.title}
          </Tab>
        );
      })}

      <AnimatePresence>
        {selected && <Content dir={dir} selected={selected} menuItems={menuItems} />}
      </AnimatePresence>
    </div>
  );
};

const Tab = ({
  children,
  tab,
  handleSetSelected,
  selected,
}: {
  children: ReactNode;
  tab: number;
  handleSetSelected: (val: number | null) => void;
  selected: number | null;
}) => {
  return (
    <button 
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      onClick={() => handleSetSelected(tab)}
      className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors ${
        selected === tab
          ? " bg-neutral-100 text-neutral-900"
          : "text-neutral-600"
      }`}
    >
      <span>{children}</span>
      <ChevronDown
        size={14}
        className={`transition-transform ${
          selected === tab ? "rotate-180" : ""
        }`}
      />
    </button>
  );
};

const Content = ({
  selected,
  dir,
  menuItems,
}: {
  selected: number | null;
  dir: null | "l" | "r";
  menuItems: any;
}) => {
  return (
    <motion.div

      id="overlay-content"
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 8,
      }}
      className="absolute top-[calc(100%_+_24px)] left-1/2 transform -translate-x-1/2 w-5xl rounded-lg border border-neutral-200 bg-gradient-to-b from-neutral-50 via-neutral-50 to-neutral-100 p-4"
    >
      <Bridge />
      <Nub selected={selected} />

      {TABS.map((t) => {
        return (
          <div className="overflow-hidden" key={t.id}>
            {selected === t.id && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: dir === "l" ? 100 : dir === "r" ? -100 : 0,
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <t.Component menuItems={menuItems} />
              </motion.div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

const Bridge = () => (
  <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />
);

const Nub = ({ selected }: { selected: number | null }) => {
  const [left, setLeft] = useState(0);

  const moveNub = useCallback(() => {
    if (selected) {
      const hoveredTab = document.getElementById(`shift-tab-${selected}`);
      const overlayContent = document.getElementById("overlay-content");

      if (!hoveredTab || !overlayContent) return;

      const tabRect = hoveredTab.getBoundingClientRect();
      const { left: contentLeft } = overlayContent.getBoundingClientRect();

      const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

      setLeft(tabCenter);
    }
  }, [selected]);

  useEffect(() => {
    moveNub();
  }, [moveNub]);

  return (
    <motion.span
      style={{
        clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
      }}
      animate={{ left }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-neutral-300 bg-neutral-50"
    />
  );
};

const Products = ({ menuItems }: { menuItems: any }) => {
  if (!menuItems?.categories) {
    return <nav>Error, por favor recargue la página</nav>;
  }

  return (
    
    <nav className="space-y-3 grid grid-cols-4 gap-4">
      
      {menuItems.categories.map(cat => {
        const subCats = menuItems.subcategories?.filter((sub: any) => sub.category?._id === cat._id) || [];
        
        return (
          <div key={cat._id} className="mb-4 flex flex-col">
            <a 
              href={`/catalog?category=${cat._id}`}
              className="font-semibold text-neutral-900 mb-2 hover:text-red-500 transition-colors"
            >
              {cat.title}
            </a>
            <ul className="space-y-1 pl-4">
              {subCats.map(sub => (
                <li key={sub._id}>
                  <a 
                    href={`/catalog?category=${cat._id}&subcategory=${sub._id}`}
                    className="text-sm text-neutral-600 hover:text-red-500 cursor-pointer transition-colors"
                  >
                    {sub.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <Button asChild variant="default" size="sm">
            <Link href="/catalog">
              Catálogo Completo
            </Link>
      </Button>
    </nav>
 
  );
};

const Buscar = ({ menuItems }: { menuItems: any }) => {
  return (
    <div className="grid grid-cols-3 gap-4 divide-x divide-neutral-700">
      <a
        href="#"
        className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
      >
        
        <span className="text-xs">Startup</span>
      </a>
      <a
        href="#"
        className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
      >
       
        <span className="text-xs">Scaleup</span>
      </a>
      <a
        href="#"
        className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
      >
        
        <span className="text-xs">Enterprise</span>
      </a>
    </div>
  );
};

const Blog = ({ menuItems }: { menuItems: any }) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <a href="#">
          <img
            className="mb-2 h-14 w-full rounded object-cover"
            src="/imgs/blog/4.png"
            alt="Placeholder image"
          />
          <h4 className="mb-0.5 text-sm font-medium">Lorem ipsum dolor</h4>
          <p className="text-xs text-neutral-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo
            quidem eos.
          </p>
        </a>
        <a href="#">
          <img
            className="mb-2 h-14 w-full rounded object-cover"
            src="/imgs/blog/5.png"
            alt="Placeholder image"
          />
          <h4 className="mb-0.5 text-sm font-medium">Lorem ipsum dolor</h4>
          <p className="text-xs text-neutral-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo
            quidem eos.
          </p>
        </a>
      </div>
      <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300">
        <span>View more</span>
      </button>
    </div>
  );
};

const TABS = [
  {
    title: "Products",
    Component: Products,
  },
  {
    title: "Buscar",
    Component: Buscar,
  },
  {
    title: "Blog",
    Component: Blog,
  },
].map((n, idx) => ({ ...n, id: idx + 1 }));






