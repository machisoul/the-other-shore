import Link from 'next/link'
import { getChapterContent, getAllChapters } from '@/lib/novel'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const chapters = getAllChapters()
  return chapters.map((chapter) => ({
    slug: chapter.slug,
  }))
}

export default function ChapterPage({ params }: PageProps) {
  try {
    const chapter = getChapterContent(params.slug)
    const allChapters = getAllChapters()

    // Find current chapter index
    const currentIndex = allChapters.findIndex(ch => ch.slug === params.slug)
    const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null
    const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null

    return (
      <main className="paper-container">
        <article className="novel-content">
          {chapter.metadata.title && (
            <h1>{chapter.metadata.title}</h1>
          )}

          <div dangerouslySetInnerHTML={{ __html: chapter.htmlContent }} />

          <nav className="chapter-nav">
            <div>
              {prevChapter ? (
                <Link href={`/chapter/${prevChapter.slug}`} className="nav-button">
                  ← 上一章
                </Link>
              ) : (
                <span className="nav-button disabled">← 上一章</span>
              )}
            </div>

            <div>
              <Link href="/" className="home-button">
                目录
              </Link>
            </div>

            <div>
              {nextChapter ? (
                <Link href={`/chapter/${nextChapter.slug}`} className="nav-button">
                  下一章 →
                </Link>
              ) : (
                <span className="nav-button disabled">下一章 →</span>
              )}
            </div>
          </nav>
        </article>
      </main>
    )
  } catch (error) {
    notFound()
  }
}
