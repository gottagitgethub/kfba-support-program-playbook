const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const failures = [];
const tokens = [
  '강한 소상공인 성장지원','로컬크리에이터','스마트상점','온라인 판로','물류','희망리턴패키지','클린제조환경',
  '사회보험료','충남 온라인 플랫폼 판로지원','시군 경영환경개선','음식점 위생','입식탁자','조리장',
  '전기요금','에너지','카드수수료','배달·택배비','노란우산','풍수해','화재보험','정책자금 기본안내',
  '제목','핵심내용','외식업 선발전략','신청서 작성 방향','쉬운 신청 5단계','사진','기본서류','견적','전화 확인','방문/온라인 접수',
  '맞춤 추천','증빙 체크','비용/우선순위','신청서 초안','localStorage','requestFullscreen','ArrowLeft','ArrowRight'
];
for (const t of tokens) if (!html.includes(t)) failures.push(`missing ${t}`);
const programCount = (html.match(/title:'/g) || []).length;
if (programCount < 16) failures.push(`program count ${programCount} < 16`);
const sensitivePattern = new RegExp(['api[_-]?key','sec'+'ret','password\\s*=','BEGIN PRIVATE ' + 'KEY','sk-[A-Za-z0-9]{20,}','ghp_[A-Za-z0-9]{20,}'].join('|'), 'i');
if (sensitivePattern.test(html)) failures.push('possible sensitive token found');
if (failures.length) {
  console.error('CHECK FAILED');
  failures.forEach(f => console.error('- ' + f));
  process.exit(1);
}
console.log(`CHECK OK — support playbook has ${programCount} program cards, required examples, senior-friendly 5 steps, keyboard/localStorage/fullscreen, and application draft.`);
