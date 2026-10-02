---
id: genomic-data
term: 유전체 데이터(VCF)
aliases:
  - Genomic Data
  - 유전체 데이터
  - VCF
  - Variant Call Format
  - NGS 데이터
  - FASTQ/BAM/VCF
category: medical
tags:
  - 의료데이터
  - 데이터엔지니어링
level: 3
kind: concept
related:
  - de-identification
  - medical-data-law
  - health-data-guideline
  - csv-parquet
  - etl-pipeline
  - object-storage
see_also:
  - https://samtools.github.io/hts-specs/VCFv4.2.pdf
  - https://samtools.github.io/bcftools/bcftools.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

사람 DNA 를 읽어 **기준 서열과 다른 변이를 기록한** 데이터로, 변이 목록 파일이 VCF 다.

## 비유

**표준 교과서와 내 책을 한 글자씩 비교해 틀린 곳만 적은 정오표**. 책 전체(30억 글자)를 복사하는 대신 "몇 쪽 몇째 줄이 A 가 아니라 G" 만 적으니 훨씬 작다.

## 예시

```text
##fileformat=VCFv4.2
##reference=GRCh38
#CHROM  POS        ID           REF  ALT  QUAL  FILTER  INFO             FORMAT  S-014
chr7    55191822   rs121434568  T    G    812   PASS    DP=143;AF=0.48   GT:DP   0/1:143
chr17   7675088    .            C    T    355   PASS    DP=98;AF=0.51    GT:DP   0/1:98
```

```bash
# 품질 30 넘고 PASS 인 변이만 골라 염색체·위치·REF·ALT·유전형을 표로
bcftools view -i 'QUAL>30 && FILTER="PASS"' S-014.vcf.gz \
  | bcftools query -f '%CHROM\t%POS\t%REF\t%ALT\t[%GT]\n' | head
```

흐름은 FASTQ(기계가 읽은 짧은 조각들) → BAM/CRAM(기준 유전체에 정렬) → VCF(변이만 추출)이고, 뒤로 갈수록 작아진다. 전장 유전체 한 사람이 FASTQ 수십~100GB, BAM 100GB 안팎, VCF 수백 MB 급이라 [확인 필요] 저장 설계가 곧 비용 설계다. 트레이드오프: BAM 을 지우고 VCF 만 남기면 싸지만 새 분석 도구로 변이를 다시 찾을 수 없고, 다 남기면 스토리지 비용이 매년 쌓인다. 기준 유전체 버전(GRCh37/hg19 vs GRCh38)이 섞이면 같은 변이의 좌표가 달라지므로 파일마다 버전을 기록한다. 유전정보는 개인정보보호법상 민감정보이고 [확인 필요], 이름을 지워도 서열 자체가 식별자가 될 수 있어 가명화만으로 안전하다고 보기 어렵다.

## 헷갈리기 쉬운 것

- **FASTQ / BAM / VCF** 는 같은 사람의 같은 데이터를 다른 가공 단계로 담은 것. 원시 → 정렬 → 변이 순이고, 임상·연구 분석의 출발점은 보통 VCF 다.
- **WGS(전장) / WES(엑솜) / 패널**은 읽는 범위의 차이. 패널은 수십~수백 개 유전자만 읽어 싸고 깊게, WGS 는 전체를 읽어 비싸고 넓게.
- **유전체(genome)** 는 DNA 전체, **유전자(gene)** 는 그중 단백질을 만드는 구간, **변이(variant)** 는 기준과 다른 위치.
