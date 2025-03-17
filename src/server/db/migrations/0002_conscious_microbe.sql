--- Custom SQL migration file, put your code below! --
UPDATE public.anomaly
SET suspected_reason = null
WHERE suspected_reason = 'blank';

UPDATE public.anomaly
SET action_required = null
WHERE action_required = 'blank'
