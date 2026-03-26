<script lang="ts">
  interface QuizAttempt {
    quizId: string;
    title: string;
    score: number;
    passed: boolean;
    date: string;
  }

  const STORAGE_KEY = 'lms_quiz_history';

  function loadHistory(): QuizAttempt[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as QuizAttempt[]) : [];
    } catch {
      return [];
    }
  }

  let history = $state<QuizAttempt[]>(loadHistory());

  const totalAttempts = $derived(history.length);
  const averageScore = $derived(
    totalAttempts === 0
      ? 0
      : Math.round(history.reduce((sum, a) => sum + a.score, 0) / totalAttempts)
  );
  const passRate = $derived(
    totalAttempts === 0
      ? 0
      : Math.round((history.filter((a) => a.passed).length / totalAttempts) * 100)
  );

  function clearHistory() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    history = [];
  }

  function formatDate(iso: string): string {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  }
</script>

<div class="space-y-6 font-sans">
  {#if totalAttempts === 0}
    <div class="alert">
      <span>No quiz attempts recorded yet. Complete a quiz to see your history here.</span>
    </div>
  {:else}
    <!-- Summary cards -->
    <div class="stats stats-horizontal shadow w-full">
      <div class="stat">
        <div class="stat-title">Total Attempts</div>
        <div class="stat-value text-primary">{totalAttempts}</div>
      </div>
      <div class="stat">
        <div class="stat-title">Average Score</div>
        <div class="stat-value text-secondary">{averageScore}%</div>
      </div>
      <div class="stat">
        <div class="stat-title">Pass Rate</div>
        <div class="stat-value text-accent">{passRate}%</div>
      </div>
    </div>

    <!-- Attempts table -->
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th>Quiz</th>
            <th class="text-right">Score</th>
            <th class="text-center">Result</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {#each [...history].reverse() as attempt (`${attempt.date}_${attempt.quizId}`)}
            <tr>
              <td class="font-medium">{attempt.title}</td>
              <td class="text-right">{attempt.score}%</td>
              <td class="text-center">
                {#if attempt.passed}
                  <span class="badge badge-success badge-sm">Passed</span>
                {:else}
                  <span class="badge badge-error badge-sm">Failed</span>
                {/if}
              </td>
              <td class="text-base-content/60 text-sm">{formatDate(attempt.date)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <button class="btn btn-soft btn-error btn-sm font-sans" onclick={clearHistory}> Clear History </button>
  {/if}
</div>
