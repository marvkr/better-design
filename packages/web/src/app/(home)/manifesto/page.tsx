import Link from "next/link";
import type { Metadata } from "next";
import { DayFromNow } from "./day-from-now";

export const metadata: Metadata = {
  title: "Manifesto",
  description: "Design is the moat. Here's what we stand for.",
  openGraph: {
    title: "Manifesto | Better Design",
    description: "Design is the moat. Here's what we stand for.",
  },
};

export default function ManifestoPage() {
  return (
    <div className="flex flex-col max-w-2xl mx-auto w-full">
      <article className="space-y-8 pt-28 pb-12 md:pt-32 md:pb-20">
        {/* Header */}
        <header className="flex flex-col gap-6">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
          >
            &larr; Back
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Design is the moat.
          </h1>
        </header>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Manifesto body */}
        <div className="space-y-6 text-foreground/90 leading-[1.8] text-[15px] md:text-base">

          <p className="text-lg font-medium text-foreground">
            Code is free now. Anyone can ship an app by <DayFromNow days={2} />.
            That changes everything about what makes a product win.
          </p>

          <p>
            When everyone has the same ingredients, the meal is decided by
            the cook. When every founder has access to the same AI, the same
            components, the same stack?
          </p>

          <p>
            The product is decided by design.
          </p>

          {/* Table of Contents */}
          <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
            <a href="#sameness" className="hover:text-foreground transition-colors">I. Sameness is the default</a>
            <a href="#standing-out" className="hover:text-foreground transition-colors">II. Standing out is not optional</a>
            <a href="#decoration" className="hover:text-foreground transition-colors">III. Decoration is a trap</a>
            <a href="#foundations" className="hover:text-foreground transition-colors">IV. Foundations carry conviction</a>
            <a href="#the-gap" className="hover:text-foreground transition-colors">V. We exist because the gap is real</a>
          </nav>

          {/* --- */}
          <div className="border-t border-border" />

          <h2 id="sameness" className="text-xl md:text-2xl font-semibold scroll-mt-24">
            I. Sameness is the default.
          </h2>

          <p>
            Open any launch feed. You could swap the screenshots between
            products and nobody would notice. Same cards. Same sidebar.
            Same muted grays. It&apos;s a crowded room where everyone showed
            up wearing the same outfit.
          </p>

          <p>
            This isn&apos;t anyone&apos;s fault. The tools converged.
            The defaults won. And now the question is: if your product looks
            like everything else, why would anyone stop scrolling?
          </p>

          {/* --- */}

          <h2 id="standing-out" className="text-xl md:text-2xl font-semibold scroll-mt-24">
            II. Standing out is not optional.
          </h2>

          <p>
            In a world of infinite supply, attention is the scarce resource.
            Your product has three seconds to answer one question:
            <em> &ldquo;Is this for me?&rdquo;</em>
          </p>

          <p>
            Not &ldquo;what does this do.&rdquo; Not &ldquo;how much does it
            cost.&rdquo;
          </p>

          <p>
            Just: <em>is this for me.</em>
          </p>

          <p>
            That answer lives entirely in the design:
          </p>

          <ol className="list-decimal list-inside space-y-1 pl-1">
            <li>The <strong>conviction</strong> behind every visual choice.</li>
            <li>The <strong>hierarchy</strong> that guides without explaining.</li>
            <li>The <strong>simplicity</strong> that earns your trust.</li>
            <li>The <strong>craft</strong> in the moments nobody asked for.</li>
          </ol>

          <p>
            Before a single word is read, the design has already spoken.
          </p>

          <p>
            If it mumbles, they leave.
          </p>

          {/* --- */}

          <h2 id="decoration" className="text-xl md:text-2xl font-semibold scroll-mt-24">
            III. Decoration is a trap.
          </h2>

          <p>
            The wrong response to sameness is noise. Gradients for the sake
            of gradients. Animations that serve no one. Glassmorphism because
            it looked cool on Dribbble. That&apos;s putting a racing stripe
            on a minivan. It draws attention. But not the right kind.
          </p>

          <p>
            The right response is identity. A clear visual point of view that
            says:
          </p>

          <ol className="list-decimal list-inside space-y-1 pl-1">
            <li><em>This is who we are.</em></li>
            <li><em>This is who we&apos;re for.</em></li>
            <li><em>This is what we value.</em></li>
          </ol>

          <p>
            That kind of design doesn&apos;t come from
            adding more. It comes from knowing what to commit to.
          </p>

          {/* --- */}

          <h2 id="foundations" className="text-xl md:text-2xl font-semibold scroll-mt-24">
            IV. Foundations carry conviction.
          </h2>

          <p>
            You can feel the difference between a product that was designed
            and a product that was decorated. Designed products have bones.
            The spacing breathes. The colors have relationships. The type
            creates hierarchy without shouting. Every pixel is a decision,
            not an accident.
          </p>

          <p>
            This kind of coherence used to require a design team and months
            of iteration. We think it should come from the starting point.
            The right tokens, scales, and systems can carry design conviction
            the way a well-built instrument carries music. You don&apos;t
            need to understand the engineering. You just hear that it
            sounds right.
          </p>

          {/* --- */}

          <h2 id="the-gap" className="text-xl md:text-2xl font-semibold scroll-mt-24">
            V. We exist because the gap is real.
          </h2>

          <p>
            Millions of people can build now. Very few of them can design.
            That&apos;s not a criticism. It&apos;s just what happens when
            one skill gets automated and the other doesn&apos;t.
          </p>

          <p>
            The result is an ocean of capable products that all blur together.
          </p>

          <p>
            We&apos;re building the bridge. Real design foundations that
            give every builder, regardless of experience, a starting
            point with actual craft behind it. Not templates to fill in.
            Not themes to download. Systems that make opinionated, cohesive
            design the path of least resistance.
          </p>

          {/* --- */}
          <div className="border-t border-border" />

          <div className="space-y-4">
            <p className="text-lg font-medium text-foreground">
              We believe the winners in this new era won&apos;t be the
              fastest builders. They&apos;ll be the ones who made you feel
              something in the first three seconds.
            </p>
            <p className="font-medium text-foreground">
              Design is the moat. We&apos;re handing out shovels.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-primary text-sm hover:underline underline-offset-4"
            >
              Start building &rarr;
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
