/**
 * Window event fired by SmoothScroll around an animated anchor scroll, so the
 * header can keep the clicked link lit while the page travels to it.
 */
export const ANCHOR_SCROLL_EVENT = "focusflow:anchorscroll";

export interface AnchorScrollDetail {
  /** Hash of the link that was clicked, e.g. "#pricing". */
  href: string;
  /** "end" fires both when the scroll arrives and when the visitor interrupts it. */
  phase: "start" | "end";
}
