function statement(invoice, plays) {
  let result = `청구내역 (고객명: ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
    result += `${playFor(perf).name}: ${usd(amountFor(perf))} ${
      perf.audience
    }석\n`;
  }

  result += `총액 ${usd(totalAmount)}\n`;
  result += `적립 포인트 ${totalVolumeCredits()}점\n`;

  return result;

  function totalAmount() {
    // 함수 이름 바꾸기
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }

    return result;
  }

  function totalVolumeCredits() {
    let result = 0; // 변수 선언(초기화)을 반복문 앞으로 이동
    for (let perf of invoice.performances) {
      // 값 누적 로직을 별도 for문으로 분리
      result += volumeCreditsFor(perf);
    }

    return result;
  }

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(aNumber / 100); // 단위 변환 로직도 이 함수 안으로 이동
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);

    if ("comedy" === playFor(aPerformance).type) {
      result += Math.floor(aPerformance.audience / 5);
    }

    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance, play) {
    let result = 0;

    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40_000;

        if (aPerformance.audience > 30) {
          result += 1_000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30_000;

        if (aPerformance.audience > 20) {
          result += 10_000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    return result;
  } // amountFor() 끝
} // statement() 끝

console.log(statement(plays, invoices));
