import { useMemo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import svgRaw from '@/assets/certificado.svg?raw'
import './CertificateSvg.css'

// Eagerly import all template images to allow dynamic selection without 404
// Expected structure: src/assets/templates/{adulto|infantil}/faixa-*.svg
const templateImagesA = import.meta.glob('@/assets/templates/**/faixa-*.svg', { eager: true, as: 'raw' })
const templateImagesB = import.meta.glob('@/assets/template/**/faixa-*.svg', { eager: true, as: 'raw' })
const templateImages = { ...templateImagesA, ...templateImagesB }

const memoryCache = new Map()
function replaceTspanById(str, tspanId, value) {
  const re = new RegExp(`(<tspan[^>]*id="${tspanId}"[^>]*>)([\\s\\S]*?)(</tspan>)`, 'm')
  return str.replace(re, `$1${value}$3`)
}

function replaceOrRemoveSerial(str, serialNumber, show) {
  const re = new RegExp(`(<text[^>]*id="text1"[\\s\\S]*?<tspan[^>]*id="tspan1"[^>]*>)([\\s\\S]*?)(</tspan>[\\s\\S]*?</text>)`, 'm')
  if (show) {
    const value = (serialNumber !== undefined && serialNumber !== null && `${serialNumber}`.length > 0)
      ? `${serialNumber}`.padStart(2, '0')
      : '00'
    return str.replace(re, `$1${value}$3`)
  }
  const removeRe = new RegExp(`<text[^>]*id="text1"[\\s\\S]*?</text>`, 'm')
  return str.replace(removeRe, '')
}

function replaceTextByLabel(str, label, value) {
  if (value === undefined || value === null) return str
  const re = new RegExp(`(<text[^>]*inkscape:label="${label}"[\\s\\S]*?<tspan[^>]*>)([\\s\\S]*?)(</tspan>[\\s\\S]*?</text>)`, 'm')
  return str.replace(re, `$1${value}$3`)
}
function replaceTextOrTspanByLabel(str, label, value) {
  if (value === undefined || value === null) return str
  const reTspan = new RegExp(`(<tspan[^>]*inkscape:label="${label}"[^>]*>)([\\s\\S]*?)(</tspan>)`, 'm')
  if (reTspan.test(str)) return str.replace(reTspan, `$1${value}$3`)
  const reText = new RegExp(`(<text[^>]*inkscape:label="${label}"[\\s\\S]*?<tspan[^>]*>)([\\s\\S]*?)(</tspan>[\\s\\S]*?</text>)`, 'm')
  if (reText.test(str)) return str.replace(reText, `$1${value}$3`)
  return str
}

function replaceFillByLabel(str, label, color) {
  if (!color) return str
  const tagRe = new RegExp(`<(?:rect|path|circle)[^>]*?inkscape:label="${label}"[^>]*?>`, 'm')
  const m = str.match(tagRe)
  if (!m) return str
  const tag = m[0]
  const newTag = tag.replace(/(fill:)([^;"]+)/, `$1${color}`)
  return str.replace(tag, newTag)
}

function insertThirdInstructorSignature(str, third) {
  if (!third) return str
  const hasAny =
    (third.name && third.name.trim().length > 0) ||
    (third.role && third.role.trim().length > 0) ||
    (third.details1 && third.details1.trim().length > 0) ||
    (third.details2 && third.details2.trim().length > 0) ||
    (third.details3 && third.details3.trim().length > 0)
  if (!hasAny) return str

  const block = `
<text xml:space="preserve" style="font-size:57.1528px;font-family:'SF Sports Night';-inkscape-font-specification:'SF Sports Night';text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;opacity:1;fill:#000000;stroke:none;stroke-width:6.60117;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;paint-order:markers fill stroke" x="9100" y="6678" id="text-center-name"><tspan sodipodi:role="line" id="tspan-center-name" x="9100" y="6678" style="font-family:'Times New Roman';-inkscape-font-specification:'Times New Roman,  Bold';stroke-width:6.60117">${third.name ?? ''}</tspan></text>
<text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:25.641px;font-family:'Times New Roman';-inkscape-font-specification:'Times New Roman,  Bold';text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;opacity:1;fill:#000000;stroke:none;stroke-width:4.93591;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;paint-order:markers fill stroke" x="9200" y="6716" id="text-center-title"><tspan sodipodi:role="line" id="tspan-center-title" x="9200" y="6716" style="stroke-width:4.93591">${third.role ?? ''}</tspan></text>
<text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:25.641px;font-family:'Times New Roman';-inkscape-font-specification:'Times New Roman, ';text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;opacity:1;fill:#000000;stroke:none;stroke-width:4.93591;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;paint-order:markers fill stroke" x="9150" y="6778" id="text-center-faixa"><tspan sodipodi:role="line" id="tspan-center-faixa" x="9150" y="6778" style="stroke-width:4.93591">${third.details1 ?? ''}</tspan></text>
<text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:25.641px;font-family:'Times New Roman';-inkscape-font-specification:'Times New Roman, ';text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;opacity:1;fill:#000000;stroke:none;stroke-width:4.93591;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;paint-order:markers fill stroke" x="9180" y="6814" id="text-center-fpjj"><tspan sodipodi:role="line" id="tspan-center-fpjj" x="9180" y="6814" style="stroke-width:4.93591">${third.details2 ?? ''}</tspan></text>
<text xml:space="preserve" style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:25.641px;font-family:'Times New Roman';-inkscape-font-specification:'Times New Roman, ';text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;opacity:1;fill:#000000;stroke:none;stroke-width:4.93591;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;paint-order:markers fill stroke" x="9160" y="6849" id="text-center-cbjj"><tspan sodipodi:role="line" id="tspan-center-cbjj" x="9160" y="6849" style="stroke-width:4.93591">${third.details3 ?? ''}</tspan></text>
`
  return str.replace(/<\/svg>\s*$/m, `${block}\n</svg>`)
}

export function CertificateSvg({
  studentName,
  belt,
  dateLocation,
  serialNumber,
  titleText,
  templateMode,
  templateCategory,
  labelValues,
  beltColors,
  enablePreview,
  onGenerated,
  onPreviewReady,
  onPrintReady,
  triggerPrint,
}) {
  const normalizedBeltSlug = useMemo(() => {
    const s = String(belt || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const seps = ['/', '-', ' e ', ' & ', ',']
    let parts = [s.trim()]
    for (const sep of seps) {
      if (s.includes(sep)) {
        parts = s.split(sep).map(p => p.trim()).filter(Boolean)
        break
      }
    }
    return parts.join('-')
  }, [belt])

  const templateContent = useMemo(() => {
    const category = String(templateCategory || '').toLowerCase().trim()
    const filename = `faixa-${normalizedBeltSlug}.svg`
    // Find matching image by suffix to be resilient to path differences
    const entry = Object.entries(templateImages).find(([key]) => {
      const k = key.toLowerCase()
      return (k.includes(`/templates/${category}/`) || k.includes(`/template/${category}/`)) && k.endsWith(`/${filename}`)
    })
    return entry ? entry[1] : null
  }, [templateCategory, normalizedBeltSlug])

  const transformed = useMemo(() => {
    let s = templateContent || svgRaw

    // New SVG templates replacements (rank, data, nome-aluno)
    if (templateContent) {
      s = replaceTextByLabel(s, 'rank', (serialNumber || '00'))
      s = replaceTextByLabel(s, 'data', (dateLocation || '').toUpperCase())
      s = replaceTextByLabel(s, 'nome-aluno', (studentName || '').toUpperCase())
    } else {
      // Legacy/Default replacements (only if using default or if labels match)
      s = replaceTspanById(s, 'tspan57', (dateLocation || '').toUpperCase())
      s = replaceTspanById(s, 'tspan2', (studentName || '').toUpperCase())
      const ttl = titleText || `FAIXA ${String(belt || '').toUpperCase()}`
      s = replaceTspanById(s, 'tspan50', ttl)
      s = replaceTextByLabel(s, 'text-nome-aluno', (studentName || '').toUpperCase())
      s = replaceTextByLabel(s, 'text-merito', (titleText || `FAIXA ${String(belt || '').toUpperCase()}`))
      
      const showSerial = String(belt || '').toLowerCase() === 'preta'
      s = replaceOrRemoveSerial(s, serialNumber, showSerial)
    }

    // Editar textos pelas labels fornecidas
    if (labelValues) {
      s = replaceTextByLabel(s, 'text-cidade-data', (labelValues['text-cidade-data'] ?? (dateLocation || '')).toUpperCase())
      s = replaceTextByLabel(s, 'text-supervisor-name', labelValues['text-supervisor-name'])
      s = replaceTextByLabel(s, 'text-supervisor-title', labelValues['text-supervisor-title'])
      s = replaceTextByLabel(s, 'text-supervisor-faixa', labelValues['text-supervisor-faixa'])
      s = replaceTextOrTspanByLabel(s, 'text-supervisor-fpjj', labelValues['text-supervisor-fpjj'])
      s = replaceTextOrTspanByLabel(s, 'text-supervidor-fpjj', labelValues['text-supervisor-fpjj'])
      s = replaceTextByLabel(s, 'text-supervisor-cbjj-ibjjf', labelValues['text-supervisor-cbjj-ibjjf'])
      s = replaceTextByLabel(s, 'text-mestre-name', labelValues['text-mestre-name'])
      s = replaceTextByLabel(s, 'text-mestre-title', labelValues['text-mestre-title'])
      s = replaceTextByLabel(s, 'text-mestre-faixa', labelValues['text-mestre-faixa'])
      s = replaceTextByLabel(s, 'text-mestre-fpjj', labelValues['text-mestre-fpjj'])
      s = replaceTextByLabel(s, 'text-mestre-cbjj-ibjjf', labelValues['text-mestre-cbjj-ibjjf'])
      s = replaceTextByLabel(s, 'text-merito', labelValues['text-merito'])
      s = replaceTextByLabel(s, 'text-nome-aluno', labelValues['text-nome-aluno'])
      // text-merito mantido com estrutura original; FAIXA é atualizada via tspan50 acima
    }

    // Editar cores das barras de faixa pela label
    if (beltColors) {
      s = replaceFillByLabel(s, 'belt-color', beltColors['belt-color'])
      s = replaceFillByLabel(s, 'belt-listra', beltColors['belt-listra'])
      s = replaceFillByLabel(s, 'belt-grau', beltColors['belt-grau'])
      s = replaceFillByLabel(s, 'belt-rank-black', beltColors['belt-rank-black'])
    }

    if (labelValues?.thirdInstructorEnabled) {
      s = insertThirdInstructorSignature(s, labelValues?.thirdInstructor)
    }

    // Force standard A4 dimensions and viewBox to prevent rendering issues
    // This fixes issues where some SVGs might have incorrect headers or aspect ratios
    s = s.replace(/<svg([^>]*)>/, (match, attrs) => {
      // Remove existing width/height/viewBox to avoid duplicates
      let newAttrs = attrs.replace(/\s+width="[^"]*"/g, '')
                          .replace(/\s+height="[^"]*"/g, '')
                          .replace(/\s+viewBox="[^"]*"/g, '')
      
      // Add standard A4 landscape headers
      return `<svg${newAttrs} width="297mm" height="210mm" viewBox="0 0 297 210">`
    })

    return s
  }, [studentName, belt, dateLocation, serialNumber, titleText, labelValues, beltColors, templateContent])

  const [pngDataUrl, setPngDataUrl] = useState(null)
  const [pngDataUrlPrint, setPngDataUrlPrint] = useState(null)
  const [usePrint, setUsePrint] = useState(false)

  const cacheKey = useMemo(() => {
    return btoa(JSON.stringify({ v: '3', studentName, belt, dateLocation, serialNumber, titleText, labelValues, beltColors, templateMode, templateCategory }))
  }, [studentName, belt, dateLocation, serialNumber, titleText, labelValues, beltColors, templateMode, templateCategory])

  useEffect(() => {
    if (!enablePreview || usePrint) return

    const mem = memoryCache.get(cacheKey)
    if (mem && mem.screen && Date.now() - mem.ts < 86400000) {
      setPngDataUrl(mem.screen)
      if (onPreviewReady) { try { onPreviewReady() } catch {} }
      if (onGenerated) { try { onGenerated({ screen: mem.screen }) } catch {} }
      return
    }
    const ls = localStorage.getItem(cacheKey)
    if (ls) {
      try {
        const parsed = JSON.parse(ls)
        if (parsed && parsed.screen && Date.now() - parsed.ts < 86400000) {
          setPngDataUrl(parsed.screen)
          memoryCache.set(cacheKey, { screen: parsed.screen, print: parsed.print, ts: parsed.ts })
          if (onPreviewReady) { try { onPreviewReady() } catch {} }
          if (onGenerated) { try { onGenerated({ screen: parsed.screen }) } catch {} }
          return
        }
      } catch {}
    }
    const svgBlob = new Blob([transformed], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(svgBlob)
    const img = new Image()
    img.onload = () => {
      const w = img.naturalWidth || 3702
      const h = img.naturalHeight || 2628
      const k = Math.min(1280 / w, 720 / h)
      const tw = Math.floor(w * k)
      const th = Math.floor(h * k)
      const canvas = document.createElement('canvas')
      canvas.width = 1280
      canvas.height = 720
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, 1280, 720)
      const x = Math.floor((1280 - tw) / 2)
      const y = Math.floor((720 - th) / 2)
      ctx.drawImage(img, x, y, tw, th)
      const png = canvas.toDataURL('image/png')
      setPngDataUrl(png)
      memoryCache.set(cacheKey, { screen: png, ts: Date.now() })
      try { localStorage.setItem(cacheKey, JSON.stringify({ screen: png, ts: Date.now() })) } catch {}
      if (onPreviewReady) { try { onPreviewReady() } catch {} }
      if (onGenerated) { try { onGenerated({ screen: png }) } catch {} }

      URL.revokeObjectURL(url)
    }
    img.src = url
    return () => URL.revokeObjectURL(url)
  }, [transformed, enablePreview, usePrint, cacheKey, onGenerated, onPreviewReady])

  useEffect(() => {
    const mq = window.matchMedia('print')
    const handler = (e) => setUsePrint(e.matches)
    if (mq.addEventListener) mq.addEventListener('change', handler)
    else mq.addListener(handler)
    const before = () => setUsePrint(true)
    const after = () => setUsePrint(false)
    window.addEventListener('beforeprint', before)
    window.addEventListener('afterprint', after)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler)
      else mq.removeListener(handler)
      window.removeEventListener('beforeprint', before)
      window.removeEventListener('afterprint', after)
    }
  }, [])
  useEffect(() => {
    if (!usePrint && !triggerPrint) return

    const mem = memoryCache.get(cacheKey)
    if (mem && mem.print && Date.now() - mem.ts < 86400000) {
      setPngDataUrlPrint(mem.print)
      if (onPrintReady) { try { onPrintReady() } catch {} }
      return
    }
    const ls = localStorage.getItem(cacheKey)
    if (ls) {
      try {
        const parsed = JSON.parse(ls)
        if (parsed && parsed.print && Date.now() - parsed.ts < 86400000) {
          setPngDataUrlPrint(parsed.print)
          memoryCache.set(cacheKey, { ...(memoryCache.get(cacheKey) || {}), print: parsed.print, ts: parsed.ts })
          if (onPrintReady) { try { onPrintReady() } catch {} }
          return
        }
      } catch {}
    }
    const svgBlob = new Blob([transformed], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(svgBlob)
    const img = new Image()
    img.onload = () => {
      const w = img.naturalWidth || 3702
      const h = img.naturalHeight || 2628
      
      console.log(`[CertificateSvg] Print Gen: ${studentName} (${belt})`, {
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        w, h
      });

      // High resolution for print (Target A4 @ 300dpi approx width 3508px)
      const maxDim = 3508
      const scale = Math.min(maxDim / w, maxDim / h)
      
      const tw = Math.floor(w * scale)
      const th = Math.floor(h * scale)
      
      const canvas = document.createElement('canvas')
      canvas.width = tw
      canvas.height = th
      
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, tw, th)
      ctx.drawImage(img, 0, 0, tw, th)
      
      const pngPrint = canvas.toDataURL('image/png')
      setPngDataUrlPrint(pngPrint)
      memoryCache.set(cacheKey, { ...(memoryCache.get(cacheKey) || {}), print: pngPrint, ts: Date.now() })
      try {
        const existing = memoryCache.get(cacheKey) || {}
        localStorage.setItem(cacheKey, JSON.stringify({ screen: existing.screen, print: pngPrint, ts: Date.now() }))
      } catch {}
      if (onPrintReady) { try { onPrintReady() } catch {} }
      URL.revokeObjectURL(url)
    }
    img.src = url
    return () => URL.revokeObjectURL(url)
  }, [usePrint, triggerPrint, transformed, cacheKey])


  return (
    <div className="certificate-svg-container">
      {pngDataUrl && <img src={pngDataUrl} alt="Certificado" className="screen-img" />}
      {pngDataUrlPrint && <img src={pngDataUrlPrint} alt="Certificado (print)" className="print-img" />}
    </div>
  )
}

export default CertificateSvg

CertificateSvg.propTypes = {
  studentName: PropTypes.string.isRequired,
  belt: PropTypes.string.isRequired,
  dateLocation: PropTypes.string.isRequired,
  serialNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  titleText: PropTypes.string,
  templateMode: PropTypes.bool,
  templateCategory: PropTypes.string,
  labelValues: PropTypes.object,
  beltColors: PropTypes.object,
  enablePreview: PropTypes.bool,
  onGenerated: PropTypes.func,
  onPreviewReady: PropTypes.func,
  triggerPrint: PropTypes.bool,
}
