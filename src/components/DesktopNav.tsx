import Link from "next/link";
import { useState, ElementType, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search } from 'lucide-react';
import Image from "next/image"

interface Category {
    _id: string;
    title: string;
}

interface SubCategory {
    _id: string;
    title: string;
    category?: { _id: string };
}

interface Item {
    _id: string;
    title: string;
    price?: number;
    description?: string;
    images?: Array<{ asset: { url: string } }>;
    subcategory?: { _id: string; title: string; category?: { _id: string } };
}

interface MenuItemsData {
    categories?: Category[];
    subcategories?: SubCategory[];
    items?: Item[];
}

export default function DesktopNav({ menuItems }: { menuItems: MenuItemsData }) {
    const [blurred, setBlurred] = useState(false);

    return (
        <>
            <div className={`fixed top-0 left-0 w-full h-full backdrop-blur-xl bg-neutral-900/10 z-10 transition-opacity motion-reduce:transition-none ${blurred ? "opacity-100 block" : "opacity-0 hidden"}`} onClick={() => setBlurred(false)}></div>
            <ul className="flex items-center gap-1 bg-neutral-100 rounded-full px-4 py-2 z-20">
                <FlyoutLink href="/" id="1">Inicio</FlyoutLink>
                <FlyoutLink href="/catalog" id="2" FlyoutContent={(onClose: () => void) => <Catalogo menuItems={menuItems} onClose={onClose} />}>Catálogo</FlyoutLink>
                <FlyoutLink href="/" id="3" FlyoutContent={Ofertas}>Ofertas</FlyoutLink>
                <SearchTabLink href="/" id="4" FlyoutContent={(onClose: () => void) => <SearchBar items={menuItems.items || []} categories={menuItems.categories || []} subcategories={menuItems.subcategories || []} onClose={onClose} />} onBlurChange={setBlurred}>Buscar<Search className={`h-4 w-4 transition-colors text-red-600`} /></SearchTabLink>
            </ul>
        </>
    );
}



const FlyoutLink = ({ children, href, FlyoutContent, id }: { children: ReactNode; id: string; href: string; FlyoutContent?: ElementType | ((onClose: () => void) => ReactNode);}) => {
    const [open, setOpen] = useState(false);

    const showFlyout = open && FlyoutContent;
    const handleClose = () => setOpen(false);

    return (
        <div
            onMouseEnter={() => {setOpen(true);}}
            onMouseLeave={() => {setOpen(false);}}
            className="group z-40">
                <li>
            <Link href={href} id={id} className={`flex items-center gap-1 rounded-full px-6 py-3 transition-colors
                ${open ? "bg-black text-white" : "text-neutral-800"}`}>
                {children}
                {FlyoutContent && <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />}
            </Link>
            </li>
            <AnimatePresence>
                {showFlyout && (
                    <motion.div
                        initial={{ opacity: 0, y: 0, scale: 0.9 }}
                        animate={{ opacity: 1, y: 15, scale: 1 }}
                        exit={{ opacity: 0, y: 0, scale: 0.9 }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                        className="absolute left-0 right-0 max-w-7xl mx-auto top-18 bg-transparent text-black shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg">
                        <div className="absolute -top-10 left-0 right-0 h-12 bg-transparent" />
                        {typeof FlyoutContent === 'function' && !('displayName' in FlyoutContent) ? (FlyoutContent as (onClose: () => void) => ReactNode)(handleClose) : FlyoutContent ? <FlyoutContent /> : null}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const SearchTabLink = ({ children, href, FlyoutContent, id, onBlurChange }: { children: ReactNode; id: string; href: string; FlyoutContent: (onClose: () => void) => ReactNode; onBlurChange: (blurred: boolean) => void;}) => {
    const [open, setOpen] = useState(false);

    const showFlyout = open && FlyoutContent;
    const handleClose = () => setOpen(false);

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        onBlurChange(isOpen);
    };

    return (
        <div
            onMouseEnter={() => {handleOpenChange(true);}}
            onMouseLeave={() => {handleOpenChange(false);}}
            className="group z-40">
                <li>
            <Link href={href} id={id} className={`flex items-center gap-1 rounded-full px-6 py-3 transition-colors
                ${open ? "bg-black text-white" : "text-neutral-800"}`}>
                {children}
            </Link>
            </li>
            <AnimatePresence>
                {showFlyout && (
                    <motion.div
                        initial={{ opacity: 0, y: 0, scale: 0.9 }}
                        animate={{ opacity: 1, y: 15, scale: 1 }}
                        exit={{ opacity: 0, y: 0, scale: 0.9 }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                        className="absolute left-0 right-0 max-w-7xl mx-auto top-18 bg-transparent text-black shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg">
                        <div className="absolute -top-10 left-0 right-0 h-12 bg-transparent" />
                        {FlyoutContent(handleClose)}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const Catalogo = ({ menuItems, onClose }: { menuItems: MenuItemsData, onClose: () => void }) => {
    if (!menuItems?.categories) {
        return <nav>Error, por favor recargue la página</nav>;
    }

    return (

        <nav className="grid grid-cols-6 gap-4 bg-white p-10 shadow-xl rounded-lg left-0 right-0 mx-auto w-full">

            {menuItems.categories.map((cat: Category) => {
                const subCats = menuItems.subcategories?.filter((sub: SubCategory) => sub.category?._id === cat._id) || [];

                return (
                    <div key={cat._id} className="mb-4 flex flex-col">
                        <a
                            href={`/catalog?category=${cat._id}`}
                            onClick={onClose}
                            className="font-semibold text-neutral-900 mb-2 hover:text-red-500 transition-colors"
                        >
                            {cat.title}
                        </a>
                        <ul className="space-y-1 pl-4">
                            {subCats.map((sub: SubCategory) => (
                                <li key={sub._id}>
                                    <a
                                        href={`/catalog?category=${cat._id}&subcategory=${sub._id}`}
                                        onClick={onClose}
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

const SearchBar = ({ items, categories, subcategories, onClose }: { items: Item[], categories: Category[], subcategories: SubCategory[], onClose: () => void }) => {
    const [search, setSearch] = useState('')
    
    // Filtrar productos
    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 6)

    // Filtrar categorías
    const filteredCategories = categories.filter(cat =>
        cat.title.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 4)

    // Filtrar subcategorías
    const filteredSubcategories = subcategories.filter(sub =>
        sub.title.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 4)

    const hasResults = filteredItems.length > 0 || filteredCategories.length > 0 || filteredSubcategories.length > 0

    return (
        <div className="bg-white p-6 shadow-xl rounded-lg w-full max-w-7xl">
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Buscar productos, categorías..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
            </div>

            {/* Categorías y Subcategorías como Pills */}
            {search && (filteredCategories.length > 0 || filteredSubcategories.length > 0) && (
                <div className="mb-6 pb-6 border-b border-gray-200">
                    <p className="text-xs text-gray-500 font-semibold mb-3 uppercase">Categorías</p>
                    <div className="flex flex-wrap gap-2">
                        {filteredCategories.map((cat) => (
                            <Link key={cat._id} href={`/catalog?category=${cat._id}`} onClick={onClose}>
                                <span className="inline-block px-4 py-2 border-2 bg-black text-white rounded-full text-sm font-medium hover:bg-red-600 transition-colors cursor-pointer">
                                    {cat.title}
                                </span>
                            </Link>
                        ))}
                        {filteredSubcategories.map((sub) => (
                            <Link key={sub._id} href={`/catalog?category=${sub.category?._id}&subcategory=${sub._id}`} onClick={onClose}>
                                <span className="inline-block px-4 py-2 border-2 text-black rounded-full text-sm font-medium hover:bg-red-600 hover:text-white transition-colors cursor-pointer">
                                    {sub.title}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Productos */}
            {hasResults ? (
                filteredItems.length > 0 && (
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {filteredItems.map((item) => (
                            <Link key={item._id} href={`/catalog/${item._id}`} onClick={onClose} className="flex-shrink-0 w-48">
                                <div className="bg-gray-50 rounded-lg p-3 hover:shadow-lg transition-shadow h-full flex flex-col">
                                    <div className="h-32 bg-white rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                                        {item.images && item.images.length > 0 ? (
                                            <Image
                                                src={item.images[0]?.asset?.url || ''}
                                                fill
                                                quality={1}
                                                alt={item.title} 
                                                className="h-full w-full object-contain"
                                            />
                                        ) : (
                                            <span className="text-gray-400">Sin imagen</span>
                                        )}
                                    </div>
                                    <h3 className="font-semibold text-sm line-clamp-2">{item.title}</h3>
                                    {item.price && (
                                        <p className="text-red-600 font-bold mt-2">
                                            ${item.price.toFixed(2)}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )
            ) : (
                <div className="text-center py-8 text-gray-500">
                    {search ? 'No se encontraron resultados' : 'Comienza a escribir para buscar'}
                </div>
            )}
        </div>
    )
}