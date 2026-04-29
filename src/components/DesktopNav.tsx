import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from 'lucide-react';

interface Category {
    _id: string;
    title: string;
}

interface SubCategory {
    _id: string;
    title: string;
    category?: { _id: string };
}

interface MenuItemsData {
    categories?: Category[];
    subcategories?: SubCategory[];
    items?: Array<Record<string, unknown>>;
}

export default function DesktopNav({ menuItems }: { menuItems: MenuItemsData }) {
    return (
        <nav className="flex">
            <FlyoutLink href="/" id="1">Home</FlyoutLink>
            <FlyoutLink href="/catalog" id="2" FlyoutContent={() => <Catalogo menuItems={menuItems} />}>Catálogo</FlyoutLink>
            <FlyoutLink href="/" id="3" FlyoutContent={Ofertas}>Ofertas</FlyoutLink>
        </nav>
    );
}

const FlyoutLink = ({ children, href, FlyoutContent, id }: { children: React.ReactNode; id: string; href: string; FlyoutContent?: React.ElementType; }) => {
    const [open, setOpen] = useState(false);

    const showFlyout = open && FlyoutContent;

    return (
        <div
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className="group relative h-fit w-fit">
            <Link href={href} id={id} className={`relative flex items-center gap-1 rounded-full px-6 py-1 transition-colors
                ${open ? "bg-white text-black" : "text-neutral-500"}`}>
                {children}
                <ChevronDown
                    size={14}
                    className={`transition-transform ${open ? "rotate-180" : ""}`} />
                {/* <span
                    style={{ transform: open ? "scaleX(1)" : "scaleX(0)" }}
                    className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full bg-red-600 transition-transform duration-300 ease-out" /> */}
            </Link>
            <AnimatePresence>
                {showFlyout && (
                    <motion.div
                        initial={{ opacity: 0, y: 0, scale: 0.9 }}
                        animate={{ opacity: 1, y: 15, scale: 1 }}
                        exit={{ opacity: 0, y: 0, scale: 0.9 }}
                        style={{ translateX: "-50%" }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                        className="absolute left-1/2 top-12 bg-transparent text-black ">
                        <div className="absolute -top-8 left-0 right-0 h-8 bg-transparent" />
                        <FlyoutContent />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const Ofertas = () => {
    return (
        <nav className="w-7xl bg-white p-10 shadow-xl rounded-lg ">
            <div className="mb-3 space-y-3">
                <h3 className="font-semibold">For Individuals</h3>
                <a href="#" className="block text-sm hover:underline">
                    Introduction
                </a>
                <a href="#" className="block text-sm hover:underline">
                    Pay as you go
                </a>
            </div>
            <div className="mb-6 space-y-3">
                <h3 className="font-semibold">For Companies</h3>
                <a href="#" className="block text-sm hover:underline">
                    Startups
                </a>
                <a href="#" className="block text-sm hover:underline">
                    SMBs
                </a>
                <a href="#" className="block text-sm hover:underline">
                    Enterprise
                </a>
            </div>
            <button className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white">
                Contact sales
            </button>
        </nav>
    );
}

const Catalogo = ({ menuItems }: { menuItems: MenuItemsData }) => {
    if (!menuItems?.categories) {
        return <nav>Error, por favor recargue la página</nav>;
    }

    return (

        <nav className="grid grid-cols-4 gap-4 bg-white p-10 shadow-xl rounded-lg left-0 right-0 mx-auto w-7xl">

            {menuItems.categories.map((cat: Category) => {
                const subCats = menuItems.subcategories?.filter((sub: SubCategory) => sub.category?._id === cat._id) || [];

                return (
                    <div key={cat._id} className="mb-4 flex flex-col">
                        <a
                            href={`/catalog?category=${cat._id}`}
                            className="font-semibold text-neutral-900 mb-2 hover:text-red-500 transition-colors"
                        >
                            {cat.title}
                        </a>
                        <ul className="space-y-1 pl-4">
                            {subCats.map((sub: SubCategory) => (
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
        </nav>

    );
}





