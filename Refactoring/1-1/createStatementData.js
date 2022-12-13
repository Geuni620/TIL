export default function createStateMentData(invoice, plays) {
  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);
  return result;

  function enrichPerformance(aPerformance) {
    const calculator = createPerformanceCalculator(
      aPerformance,
      playFor(aPerformance)
    );
    const result = Object.assign({}, aPerformance);
    result.play = playFor(result);
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }
}

function createPerformanceCalculator(aPerformance, aPlay) {
  switch ((aPlay, type)) {
    case "tragedy":
      return new TragedyCalculator(aPerformance, aPlay);

    case "comedy":
      return new ComedyCalculator(aPerformance, aPlay);

    default:
      throw new Error(`알 수 없는 장르 : ${aPlay.type}`);
  }
}

class PerformanceCalculator {
  // 공연료 계산기 클래스
  constructor(aPerformance, aPlay) {
    this.performances = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    throw new Error("서브 클래스에서 처리하도록 설계되었습니다.");
  }

  get volumeCredits() {
    return Math.max(this.performances.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    // amountFor() 함수의 코드를 계산기 클래스로 복사
    let result = 40000;
    if (this.performances.audience > 30) {
      result += 1000 * (this.performances.audience - 30);
    }

    return result;
  }

  get volumeCredits() {
    return Math.max(this.performances.audience - 30, 0);
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    // amountFor() 함수의 코드를 계산기 클래스로 복사
    let result = 30000;
    if (this.performances.audience > 20) {
      result += 1000 + 500 * (this.performances.audience - 20);
    }

    result += 300 * this.performances.audience;
    return result;
  }

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performances.audience / 5);
  }
}
