import { ArticlesInfoProps } from "../types/type";
import classes from "./ArticlesInfo.module.scss";

export function ArticlesInfo({title, desc}: ArticlesInfoProps) {
    return (
        <section className={classes.articlesInfo}>
            <h1>{title}</h1>
            <p>{desc}</p>
        </section>
    );
}