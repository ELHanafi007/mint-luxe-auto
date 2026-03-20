'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { vehicles } from '@/data/vehicles';
import VehicleCard from '@/components/sections/VehicleCard';
import styles from './InventoryPage.module.css';

function InventoryContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [activeBrand, setActiveBrand] = useState(searchParams.get('brand') || 'All');
  const [yearFilter, setYearFilter] = useState(searchParams.get('year') || 'All');

  const brands = useMemo(() => {
    const uniqueBrands = Array.from(new Set(vehicles.map(v => v.brand)));
    return ['All', ...uniqueBrands.sort()];
  }, []);

  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(vehicles.map(v => v.year.toString())));
    return ['All', ...uniqueYears.sort((a, b) => b.localeCompare(a))];
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (search) params.set('search', search); else params.delete('search');
    if (activeBrand !== 'All') params.set('brand', activeBrand); else params.delete('brand');
    if (yearFilter !== 'All') params.set('year', yearFilter); else params.delete('year');
    
    const query = params.toString();
    router.replace(`${pathname}${query ? `?${query}` : ''}`, { scroll: false });
  }, [search, activeBrand, yearFilter, pathname, router, searchParams]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase()) || 
                           v.brand.toLowerCase().includes(search.toLowerCase());
      const matchesBrand = activeBrand === 'All' || v.brand === activeBrand;
      const matchesYear = yearFilter === 'All' || v.year.toString() === yearFilter;
      return matchesSearch && matchesBrand && matchesYear;
    });
  }, [search, activeBrand, yearFilter]);

  const clearFilters = () => {
    setSearch('');
    setActiveBrand('All');
    setYearFilter('All');
  };

  return (
    <div className="container">
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <span className={styles.metadata}>Total Inventory: {vehicles.length} Units</span>
          <h1 className={styles.title}>Full Collection</h1>
        </div>

        <div className={styles.searchBar}>
          <input 
            type="text" 
            placeholder="Search by model or brand..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterGroups}>
          <nav className={styles.filters}>
            {brands.map((brand) => (
              <button
                key={brand}
                className={`${styles.filterBtn} ${activeBrand === brand ? styles.active : ''}`}
                onClick={() => setActiveBrand(brand)}
              >
                {brand}
                {activeBrand === brand && (
                  <motion.div 
                    layoutId="inventoryFilterUnderline" 
                    className={styles.underline} 
                  />
                )}
              </button>
            ))}
          </nav>

          <div className={styles.selectFilters}>
            <select 
              value={yearFilter} 
              onChange={(e) => setYearFilter(e.target.value)}
              className={styles.select}
            >
              <option value="All">All Years</option>
              {years.filter(y => y !== 'All').map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {filteredVehicles.length > 0 ? (
        <motion.div layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredVehicles.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              >
                <VehicleCard vehicle={vehicle} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className={styles.emptyState}>
          <p>No acquisitions matching your criteria were found.</p>
          <button onClick={clearFilters} className={styles.clearBtn}>Clear All Filters</button>
        </div>
      )}
    </div>
  );
}

export default function InventoryPage() {
  return (
    <main className={styles.inventoryPage}>
      <Suspense fallback={<div className="container">Loading collection...</div>}>
        <InventoryContent />
      </Suspense>
    </main>
  );
}

