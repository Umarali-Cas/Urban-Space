import dynamic from 'next/dynamic';
import classes from './MapSearch.module.scss'

const CustomMap = dynamic(() => import('@/features/CustomMap/ui/CustomMap'));


export function MapSearch() {
    return (
        <section className={classes.mapSearch}>
            <input type="text" placeholder=''/>
            <CustomMap />
        </section>
    );
}