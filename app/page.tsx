import Link from 'next/link'
import { getNovelInfo, getAllChapters, getTotalWordCount } from '@/lib/novel'
import VisitCounter from '@/components/VisitCounter'

export default function Home() {
  const novelInfo = getNovelInfo()
  const chapters = getAllChapters()
  const wordCount = getTotalWordCount()

  return (
    <main className="paper-container">
      <article className="novel-content">
        <h1>{novelInfo.title}</h1>
        <p style={{ textAlign: 'center', fontSize: '0.95rem', color: '#6b5437', marginBottom: '1rem', textIndent: 0 }}>
          作者：{novelInfo.author}
        </p>
        {/* {novelInfo.description && (
          <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#8b6f47', marginBottom: '1rem', textIndent: 0, fontStyle: 'italic' }}>
            {novelInfo.description}
          </p>
        )} */}
        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#a0896d', marginBottom: '3rem', textIndent: 0 }}>
          总字数：{wordCount.total.toLocaleString('zh-CN')} 字 | <VisitCounter displayOnly={true} />
        </p>

        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>目录</h2>
          <div className="chapter-list">
            {chapters.map((chapter) => (
              <div key={chapter.slug} className="chapter-item">
                <Link href={`/chapter/${chapter.slug}`}>
                  {chapter.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </article>
    </main>
  )
}
