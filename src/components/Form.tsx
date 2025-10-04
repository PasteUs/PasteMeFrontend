import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { PasteFormData, PasteResponse } from '@/types';

export default function Form() {
  const { t } = useTranslation();
  const { readOnce, config, updateState } = useAppStore();
  const nobody = useAppStore(state => state.namespace === 'nobody');

  const [form, setForm] = useState<PasteFormData>({
    lang: 'plain',
    content: '',
    password: '',
    self_destruct: true,
    expire_count: 1,
    expire_second: 300
  });

  const [expireMinute, setExpireMinute] = useState(5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = api.join(config.api.backend, 'paste/');
    try {
      const response: PasteResponse = await api.post(url, form);

      if (response.code === 201) {
        updateState({
          view: 'success',
          key: response.key || ''
        });
      } else {
        alert(`${response.code}: ${response.message}`);
      }
    } catch (error) {
      console.error('Failed to create paste:', error);
      alert('Failed to create paste');
    }
  };

  const handleExpireMinuteChange = (value: string) => {
    const minutes = parseInt(value, 10);
    setExpireMinute(minutes);
    setForm({ ...form, expire_second: minutes * 60 });
  };

  const languages = [
    { value: 'plain', label: t('lang.form.select.plain') },
    { value: 'cpp', label: 'C/C++' },
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python' },
    { value: 'bash', label: 'Bash' },
    { value: 'markdown', label: 'Markdown' },
    { value: 'json', label: 'JSON' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
  ];

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Language Selector */}
          <div className="space-y-2">
            <Label>{t('lang.form.input[0].prepend')}</Label>
            <Select
              value={form.lang}
              onValueChange={(value) => setForm({ ...form, lang: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <Label>{t('lang.form.input[1].prepend')}</Label>
            <div className="flex items-center gap-2">
              <Input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder={t('lang.form.input[1].placeholder')}
                autoComplete="off"
                className="flex-1"
              />
              <Checkbox checked={form.password !== ''} disabled />
            </div>
          </div>
        </div>

        {/* Content Textarea */}
        <div className="space-y-2">
          <Textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder={t(`lang.form.textarea.placeholder.${readOnce ? 'read_once' : 'write_something_here'}`)}
            rows={10}
            required
            className="font-mono resize-none"
            style={{ tabSize: 4 }}
          />
        </div>

        {/* Submit and Options */}
        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" variant={readOnce ? 'secondary' : 'default'}>
            {t('lang.form.submit')}
          </Button>

          {!readOnce && (
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="self-destruct"
                    checked={form.self_destruct}
                    onCheckedChange={(checked) =>
                      setForm({ ...form, self_destruct: checked as boolean })
                    }
                    disabled={nobody}
                  />
                  <Label htmlFor="self-destruct" className="cursor-pointer">
                    {t('lang.form.checkbox.text')}
                  </Label>
                </div>
              </PopoverTrigger>
              <PopoverContent>
                {t('lang.form.checkbox.popover')}
              </PopoverContent>
            </Popover>
          )}

          {form.self_destruct && (
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1">
                <span className="text-sm">{t('lang.form.count.prepend')}</span>
                <Input
                  type="number"
                  min={1}
                  max={3}
                  value={form.expire_count}
                  onChange={(e) => setForm({ ...form, expire_count: parseInt(e.target.value, 10) })}
                  disabled={nobody}
                  className="w-20"
                />
                <span className="text-sm">{t('lang.form.count.append')}</span>
              </div>

              <span className="text-sm">or</span>

              <div className="flex items-center gap-1">
                <span className="text-sm">{t('lang.form.time.prepend')}</span>
                <Input
                  type="number"
                  min={1}
                  max={60}
                  value={expireMinute}
                  onChange={(e) => handleExpireMinuteChange(e.target.value)}
                  disabled={nobody}
                  className="w-20"
                />
                <span className="text-sm">{t('lang.form.time.append')}</span>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
